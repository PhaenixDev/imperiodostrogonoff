import type { CartItem } from './whatsappService';

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface AddressDetails {
  street: string;
  number: string;
  neighborhood: string;
  city?: string;
  state?: string;
  complement?: string;
  reference?: string;
}

export interface SubmitOrderPayload {
  idempotencyKey: string;
  customer: CustomerDetails;
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  address?: AddressDetails;
  paymentMethod: string;
  notes?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface OrderSuccessResponse {
  success: true;
  orderId: string;
  anotaOrderId?: string;
  status: string;
  estimatedMinutes: string;
  message: string;
  restaurant: string;
}

export interface OrderErrorResponse {
  success: false;
  orderId?: string;
  userMessage: string;
  canRetry?: boolean;
}

export type OrderResponse = OrderSuccessResponse | OrderErrorResponse;

export async function submitOrderToBackend(payload: SubmitOrderPayload): Promise<OrderResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos timeout

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();
    return data as OrderResponse;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      return {
        success: false,
        userMessage: 'A comunicação com o servidor demorou mais do que o esperado. Por favor, verifique sua conexão ou finalize pelo WhatsApp.',
        canRetry: true
      };
    }

    return {
      success: false,
      userMessage: 'Não foi possível conectar com o restaurante agora. Por favor, tente novamente ou use o botão de pedido via WhatsApp.',
      canRetry: true
    };
  }
}
