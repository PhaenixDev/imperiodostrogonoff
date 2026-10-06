import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { getPaymentMessageLabel, type PaymentMethodId } from './paymentService';

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
  image?: string;
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
  paymentMethod?: PaymentMethodId;
  cashNoteAmount?: number; // só quando paymentMethod === 'valor_nota'
  subtotal: number; // soma dos produtos — a taxa de entrega é consultada na conversa
}

export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}

// Na mensagem do WhatsApp os valores seguem o padrão "R$24,90" (sem espaço)
function formatBRLCompact(amount: number): string {
  return formatBRL(amount).replace(/\s/g, '');
}

const SEPARATOR = '------------------------------';

// Linhas de pagamento do pedido; "Valor em Nota" = dinheiro na entrega + valor da cédula (troco).
export function getPaymentLines(paymentMethod?: PaymentMethodId, cashNoteAmount?: number): string[] {
  if (!paymentMethod) return [];
  const lines = [`Forma de Pagamento: ${getPaymentMessageLabel(paymentMethod)}`];
  if (paymentMethod === 'valor_nota' && cashNoteAmount) {
    lines.push(`Valor em Nota: ${formatBRLCompact(cashNoteAmount)}`);
  }
  return lines;
}

export function generateWhatsAppMessage(order: OrderDetails): string {
  const { items, orderType, customerName, customerPhone, address, distanceText, durationText, notes, paymentMethod, cashNoteAmount, subtotal } = order;
  const lines: string[] = [];

  lines.push('NOVO PEDIDO - IMPÉRIO DO STROGONOFF');
  lines.push(SEPARATOR);

  const name = customerName?.trim();
  const phone = customerPhone?.trim();
  if (name || phone) {
    lines.push(`Cliente: ${[name, phone].filter(Boolean).join(' - ')}`);
  }

  if (orderType === 'delivery') {
    lines.push('Modalidade: Entrega (Delivery)');
    if (address && address.trim()) {
      lines.push(`Endereço: ${address.trim()}`);
    }
    if (distanceText) {
      lines.push(`Distância: ${distanceText}${durationText ? ` (~${durationText} de carro)` : ''}`);
    }
  } else {
    lines.push('Modalidade: Retirada no Restaurante');
  }

  lines.push(SEPARATOR);
  lines.push('Pedido:');
  lines.push('');

  items.forEach(item => {
    lines.push(`${item.quantity}x ${item.name}`);

    // Complementos escolhidos e observação do item ficam logo abaixo do produto
    item.selectedOptions?.forEach(opt => {
      lines.push(`  • ${opt.optionName}${opt.priceDelta > 0 ? ` (+${formatBRLCompact(opt.priceDelta)})` : ''}`);
    });
    if (item.notes && item.notes.trim()) {
      lines.push(`  • Obs: ${item.notes.trim()}`);
    }
  });

  if (notes && notes.trim()) {
    lines.push('');
    lines.push(`Observações: ${notes.trim()}`);
  }

  lines.push(SEPARATOR);
  lines.push('Pagamento:');
  lines.push('');
  lines.push(`Subtotal: ${formatBRLCompact(subtotal)}`);
  lines.push(...getPaymentLines(paymentMethod, cashNoteAmount));

  lines.push(SEPARATOR);
  lines.push('Olá, tudo bem? Qual o tempo estimado e a taxa de entrega?');

  return lines.join('\n');
}

export function createWhatsAppOrderLink(order: OrderDetails): string {
  const message = generateWhatsAppMessage(order);
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = RESTAURANT_CONFIG.whatsappNumber.replace(/\D/g, '');

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function createGeneralInquiryLink(productName?: string): string {
  const phoneNumber = RESTAURANT_CONFIG.whatsappNumber.replace(/\D/g, '');
  let text = `Olá, Império do Strogonoff! Gostaria de tirar uma dúvida sobre o cardápio.`;
  if (productName) {
    text = `Olá, Império do Strogonoff! Gostaria de saber mais sobre o prato "${productName}".`;
  }
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}
