import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

export interface CartItemOption {
  groupTitle: string;
  optionName: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string; // Unique ID for each item configuration
  productId: string;
  externalId?: string;
  name: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  selectedOptions?: CartItemOption[];
  notes?: string;
  image: string;
}

export interface OrderDetails {
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  customerName?: string;
  customerPhone?: string;
  address?: string;
  distanceText?: string;
  durationText?: string;
  notes?: string;
  paymentMethod?: string;
  subtotal: number;
}

export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}

export function generateWhatsAppMessage(order: OrderDetails): string {
  const { items, orderType, customerName, customerPhone, address, distanceText, durationText, notes, paymentMethod, subtotal } = order;

  let message = `👑 *NOVO PEDIDO — IMPÉRIO DO STROGONOFF* 👑\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  if (customerName && customerName.trim()) {
    message += `🙋 *Cliente:* ${customerName.trim()}${customerPhone && customerPhone.trim() ? ` — ${customerPhone.trim()}` : ''}\n`;
  }

  message += `Olá! Gostaria de fazer o seguinte pedido:\n\n`;

  items.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.quantity;
    message += `*${item.quantity}x ${item.name}* — ${formatBRL(itemTotal)}\n`;
    
    if (item.selectedOptions && item.selectedOptions.length > 0) {
      item.selectedOptions.forEach(opt => {
        message += `  └ _${opt.groupTitle}: ${opt.optionName}`;
        if (opt.priceDelta > 0) {
          message += ` (+${formatBRL(opt.priceDelta)})`;
        }
        message += `_\n`;
      });
    }

    if (item.notes && item.notes.trim()) {
      message += `  📝 _Obs: "${item.notes.trim()}"_\n`;
    }

    if (index < items.length - 1) {
      message += `\n`;
    }
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Subtotal: ${formatBRL(subtotal)}*\n`;
  message += `🛵 *Modalidade:* ${orderType === 'delivery' ? 'Entrega (Delivery)' : 'Retirada no Restaurante'}\n`;

  if (orderType === 'delivery' && address && address.trim()) {
    message += `📍 *Endereço de Entrega:* ${address.trim()}\n`;

    if (distanceText) {
      message += `📏 *Distância até o cliente:* ${distanceText}${durationText ? ` (~${durationText} de carro)` : ''}\n`;
    }
  }

  if (paymentMethod && paymentMethod.trim()) {
    message += `💳 *Forma de Pagamento:* ${paymentMethod.trim()}\n`;
  }

  if (notes && notes.trim()) {
    message += `💬 *Observações Gerais:* ${notes.trim()}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Por favor, confirmem o pedido, taxa de entrega e o tempo estimado! 🙏✨`;

  return message;
}

export function createWhatsAppOrderLink(order: OrderDetails): string {
  const message = generateWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = RESTAURANT_CONFIG.whatsappNumber.replace(/\D/g, '');

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function createGeneralInquiryLink(productName?: string): string {
  const phoneNumber = RESTAURANT_CONFIG.whatsappNumber.replace(/\D/g, '');
  let text = `Olá, Império do Strogonofe! Gostaria de tirar uma dúvida sobre o cardápio.`;
  if (productName) {
    text = `Olá, Império do Strogonofe! Gostaria de saber mais sobre o prato "${productName}".`;
  }
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}
