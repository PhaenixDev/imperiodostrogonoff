import React, { createContext, useContext, useState, useEffect } from 'react';
import { createWhatsAppOrderLink } from '../services/whatsappService';
import type { CartItem, OrderDetails } from '../services/whatsappService';
import type { Product } from '../data/menuData';
import { submitOrderToBackend } from '../services/orderService';
import type { OrderSuccessResponse } from '../services/orderService';
import { trackEvent } from '../services/analyticsService';
import { fetchDeliveryDistance } from '../services/distanceService';
import type { DistanceResult } from '../services/distanceService';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  
  // Dados de Checkout
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  addressStreet: string;
  setAddressStreet: (street: string) => void;
  addressNumber: string;
  setAddressNumber: (num: string) => void;
  addressNeighborhood: string;
  setAddressNeighborhood: (neighborhood: string) => void;
  addressComplement: string;
  setAddressComplement: (complement: string) => void;
  customerNotes: string;
  setCustomerNotes: (notes: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;

  // Distância de entrega (Google Maps)
  deliveryDistance: DistanceResult | null;
  isCalculatingDistance: boolean;

  // Status de Submissão
  isSubmittingOrder: boolean;
  orderResult: OrderSuccessResponse | null;
  orderError: string | null;
  submitOrder: () => Promise<boolean>;
  resetOrderState: () => void;
  
  // WhatsApp Fallback / Suporte
  checkoutWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'imperio_cart_v2';
const CUSTOMER_STORAGE_KEY = 'imperio_customer_data_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  // Recupera dados salvos previamente do cliente para conveniência
  const savedCustomer = (() => {
    try {
      const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  })();

  const [customerName, setCustomerName] = useState(savedCustomer.name || '');
  const [customerPhone, setCustomerPhone] = useState(savedCustomer.phone || '');
  const [addressStreet, setAddressStreet] = useState(savedCustomer.street || '');
  const [addressNumber, setAddressNumber] = useState(savedCustomer.number || '');
  const [addressNeighborhood, setAddressNeighborhood] = useState(savedCustomer.neighborhood || '');
  const [addressComplement, setAddressComplement] = useState(savedCustomer.complement || '');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX na Entrega');

  const [deliveryDistance, setDeliveryDistance] = useState<DistanceResult | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);

  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderSuccessResponse | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Persistência de carrinho
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [items]);

  // Persistência de dados cadastrais para não precisar digitar novamente
  useEffect(() => {
    try {
      localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify({
          name: customerName,
          phone: customerPhone,
          street: addressStreet,
          number: addressNumber,
          neighborhood: addressNeighborhood,
          complement: addressComplement
        })
      );
    } catch (e) {
      // Ignora erro
    }
  }, [customerName, customerPhone, addressStreet, addressNumber, addressNeighborhood, addressComplement]);

  // Calcula a distância de entrega (Google Maps) sempre que o endereço muda,
  // com debounce para não disparar uma requisição a cada tecla digitada.
  useEffect(() => {
    if (orderType !== 'delivery' || !addressStreet.trim() || !addressNumber.trim() || !addressNeighborhood.trim()) {
      setDeliveryDistance(null);
      setIsCalculatingDistance(false);
      return;
    }

    const fullAddress = `${addressStreet}, ${addressNumber} - ${addressNeighborhood}`;
    setIsCalculatingDistance(true);

    const timeoutId = window.setTimeout(async () => {
      const result = await fetchDeliveryDistance(fullAddress);
      setDeliveryDistance(result);
      setIsCalculatingDistance(false);
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, [orderType, addressStreet, addressNumber, addressNeighborhood]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  
  // Taxa de entrega fixa estimada (ou 0 se retirada)
  const deliveryFee = orderType === 'delivery' ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  const openProductModal = (product: Product) => {
    setSelectedProductForModal(product);
    trackEvent('product_view', {
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price
    });
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  const addItem = (itemData: Omit<CartItem, 'cartItemId'>) => {
    const optionsKey = itemData.selectedOptions?.map(o => `${o.groupTitle}:${o.optionName}`).sort().join('|') || '';
    const uniqueKey = `${itemData.productId}_${optionsKey}_${itemData.notes || ''}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.cartItemId === uniqueKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += itemData.quantity;
        return updated;
      } else {
        return [...prevItems, { ...itemData, cartItemId: uniqueKey }];
      }
    });

    trackEvent('add_to_cart', {
      productId: itemData.productId,
      productName: itemData.name,
      price: itemData.unitPrice,
      itemCount: itemData.quantity
    });
  };

  const removeItem = (cartItemId: string) => {
    const item = items.find(i => i.cartItemId === cartItemId);
    if (item) {
      trackEvent('remove_from_cart', {
        productId: item.productId,
        productName: item.name
      });
    }
    setItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const resetOrderState = () => {
    setOrderResult(null);
    setOrderError(null);
    setIsSubmittingOrder(false);
  };

  /**
   * Envia o pedido para o Backend / Anota AI
   */
  const submitOrder = async (): Promise<boolean> => {
    if (items.length === 0) {
      setOrderError('Seu carrinho está vazio.');
      return false;
    }

    setIsSubmittingOrder(true);
    setOrderError(null);

    trackEvent('checkout_submit', {
      itemCount,
      totalValue: total,
      orderType
    });

    // Chave de idempotência única baseada nos itens e no timestamp recente
    const idempotencyKey = `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const payload = {
      idempotencyKey,
      customer: {
        name: customerName,
        phone: customerPhone,
        notes: customerNotes
      },
      items,
      orderType,
      address: orderType === 'delivery' ? {
        street: addressStreet,
        number: addressNumber,
        neighborhood: addressNeighborhood,
        complement: addressComplement,
        city: 'São Paulo',
        state: 'SP'
      } : undefined,
      paymentMethod,
      notes: customerNotes,
      subtotal,
      deliveryFee,
      total
    };

    const response = await submitOrderToBackend(payload);

    setIsSubmittingOrder(false);

    if (response.success) {
      setOrderResult(response);
      clearCart(); // Limpa o carrinho após confirmação com sucesso
      trackEvent('order_success', {
        orderId: response.orderId,
        totalValue: total
      });
      return true;
    } else {
      setOrderError(response.userMessage || 'Não foi possível finalizar o pedido. Tente novamente.');
      trackEvent('order_failure', {
        error: response.userMessage
      });
      return false;
    }
  };

  /**
   * Fluxo de suporte/contingência via WhatsApp
   */
  const checkoutWhatsApp = () => {
    if (items.length === 0) return;

    const fullAddress = orderType === 'delivery' && addressStreet.trim()
      ? `${addressStreet}, ${addressNumber} - ${addressNeighborhood}${addressComplement ? ` (${addressComplement})` : ''}`
      : undefined;

    const orderDetails: OrderDetails = {
      items,
      orderType,
      customerName,
      customerPhone,
      address: fullAddress,
      distanceText: deliveryDistance?.success ? deliveryDistance.distanceText : undefined,
      durationText: deliveryDistance?.success ? deliveryDistance.durationText : undefined,
      notes: customerNotes,
      paymentMethod,
      subtotal
    };

    const link = createWhatsAppOrderLink(orderDetails);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        selectedProductForModal,
        openProductModal,
        closeProductModal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        orderType,
        setOrderType,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        addressStreet,
        setAddressStreet,
        addressNumber,
        setAddressNumber,
        addressNeighborhood,
        setAddressNeighborhood,
        addressComplement,
        setAddressComplement,
        customerNotes,
        setCustomerNotes,
        paymentMethod,
        setPaymentMethod,
        deliveryDistance,
        isCalculatingDistance,
        isSubmittingOrder,
        orderResult,
        orderError,
        submitOrder,
        resetOrderState,
        checkoutWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
