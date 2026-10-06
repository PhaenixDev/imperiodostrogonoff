import React from 'react';
import { QrCode, CreditCard, HandCoins, Banknote } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PAYMENT_OPTIONS, parseCashAmount, type PaymentMethodId } from '../../services/paymentService';

const ICONS: Record<PaymentMethodId, React.FC<{ className?: string }>> = {
  pix: QrCode,
  cartao: CreditCard,
  entrega: HandCoins,
  valor_nota: Banknote,
};

// Seleção obrigatória da forma de pagamento (usada no carrinho e no checkout).
// Nunca pede dados de cartão: o pagamento é feito presencialmente.
export const PaymentMethodPicker: React.FC = () => {
  const { paymentMethod, setPaymentMethod, cashNoteInput, setCashNoteInput } = useCart();

  const cashNoteInvalid = paymentMethod === 'valor_nota' && cashNoteInput.trim() !== '' && parseCashAmount(cashNoteInput) === null;

  return (
    <div className="pt-2 border-t border-zinc-800">
      <fieldset className="space-y-2">
        <legend className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
          Forma de Pagamento *
        </legend>

        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_OPTIONS.map(option => {
            const Icon = ICONS[option.id];
            const isSelected = paymentMethod === option.id;
            return (
              <label
                key={option.id}
                className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all focus-within:ring-1 focus-within:ring-amber-500 ${
                  isSelected
                    ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                    : 'bg-[#181822] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={option.id}
                  checked={isSelected}
                  onChange={() => setPaymentMethod(option.id)}
                  className="sr-only"
                />
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-black' : 'text-amber-400'}`} />
                <span className="leading-tight">{option.label}</span>
              </label>
            );
          })}
        </div>

        {paymentMethod === 'valor_nota' && (
          <div className="space-y-1.5 pt-1">
            <label htmlFor="cash-note-value" className="text-[11px] font-bold text-zinc-300 block">
              Valor da nota * <span className="font-normal text-zinc-500">(para separarmos o troco)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">R$</span>
              <input
                id="cash-note-value"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={cashNoteInput}
                onChange={(e) => setCashNoteInput(e.target.value)}
                placeholder="50,00"
                aria-invalid={cashNoteInvalid}
                className={`w-full bg-[#181822] border rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${
                  cashNoteInvalid
                    ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500'
                    : 'border-zinc-800 focus:border-amber-500 focus:ring-amber-500'
                }`}
              />
            </div>
            {cashNoteInvalid && (
              <p className="text-[10.5px] text-red-400">Digite um valor válido maior que zero, ex.: 50,00</p>
            )}
          </div>
        )}
      </fieldset>
    </div>
  );
};
