/**
 * ANALYTICS SERVICE
 * 
 * Rastreamento de eventos do funil de pedidos da loja oficial.
 * Focado na experiência do usuário e conversão, sem coletar dados sensíveis.
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'menu_view'
  | 'category_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_start'
  | 'checkout_submit'
  | 'order_success'
  | 'order_failure';

export interface AnalyticsEventData {
  productId?: string;
  productName?: string;
  category?: string;
  price?: number;
  itemCount?: number;
  orderId?: string;
  totalValue?: number;
  orderType?: 'delivery' | 'pickup';
  [key: string]: any;
}

export function trackEvent(eventType: AnalyticsEventType, data: AnalyticsEventData = {}): void {
  const timestamp = new Date().toISOString();
  
  // Em ambiente de desenvolvimento ou produção, log estruturado
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${eventType.toUpperCase()}:`, { timestamp, ...data });
  }

  // Integração com window.dataLayer para Google Tag Manager / GA4 se presente
  try {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventType,
        ...data,
        timestamp
      });
    }
  } catch (e) {
    // Falha silenciosa para não interferir na experiência do cliente
  }
}
