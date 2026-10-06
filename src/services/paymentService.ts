// Formas de pagamento oferecidas no checkout. "Valor em Nota" não é uma forma
// de pagamento à parte: é dinheiro na entrega + o valor da cédula, para o
// restaurante saber quanto levar de troco.
export type PaymentMethodId = 'pix' | 'cartao' | 'entrega' | 'valor_nota';

export interface PaymentOption {
  id: PaymentMethodId;
  label: string; // texto exibido no formulário
  messageLabel: string; // texto usado na mensagem do WhatsApp / pedido
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'pix', label: 'PIX', messageLabel: 'PIX' },
  { id: 'cartao', label: 'Cartão', messageLabel: 'Cartão' },
  { id: 'entrega', label: 'Pagamento na Entrega', messageLabel: 'Pagamento na Entrega' },
  { id: 'valor_nota', label: 'Valor em Nota', messageLabel: 'Dinheiro na Entrega' },
];

export function getPaymentMessageLabel(id: PaymentMethodId): string {
  return PAYMENT_OPTIONS.find(o => o.id === id)?.messageLabel ?? '';
}

// Aceita valores digitados no padrão brasileiro: "50", "50,00", "R$ 50,00",
// "1.000,00" (e "50.5" com ponto decimal). Retorna null se não for um valor
// monetário válido e maior que zero.
export function parseCashAmount(input: string): number | null {
  const value = input.replace(/R\$/i, '').replace(/\s/g, '');
  if (!value) return null;

  let normalized: string;
  if (/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(value)) {
    normalized = value.replace(/\./g, '').replace(',', '.'); // 1.000,00
  } else if (/^\d+(,\d{1,2})?$/.test(value)) {
    normalized = value.replace(',', '.'); // 50 | 50,00
  } else if (/^\d+\.\d{1,2}$/.test(value)) {
    normalized = value; // 50.5
  } else {
    return null;
  }

  const amount = Number(normalized);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

// Retorna a mensagem de erro do pagamento, ou null quando está tudo certo.
export function getPaymentError(method: PaymentMethodId | '', cashNoteInput: string): string | null {
  if (!method) return 'Escolha a forma de pagamento.';
  if (method === 'valor_nota' && parseCashAmount(cashNoteInput) === null) {
    return 'Informe um valor de nota válido (ex.: 50,00).';
  }
  return null;
}
