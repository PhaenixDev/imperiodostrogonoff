import React, { useState } from 'react';
import { X, CheckCircle2, Bike, Store, CreditCard, User, AlertCircle, Loader2, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBRL } from '../../services/whatsappService';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
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
    isSubmittingOrder,
    orderResult,
    orderError,
    submitOrder,
    resetOrderState,
    checkoutWhatsApp
  } = useCart();

  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isCheckoutModalOpen) return null;

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    resetOrderState();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validações no cliente
    if (!customerName.trim() || customerName.trim().length < 3) {
      setValidationError('Por favor, informe seu nome completo.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Por favor, informe um número de telefone com DDD válido.');
      return;
    }

    if (orderType === 'delivery') {
      if (!addressStreet.trim()) {
        setValidationError('Por favor, informe a rua/avenida para a entrega.');
        return;
      }
      if (!addressNumber.trim()) {
        setValidationError('Por favor, informe o número do endereço.');
        return;
      }
      if (!addressNeighborhood.trim()) {
        setValidationError('Por favor, informe o bairro para a entrega.');
        return;
      }
    }

    await submitOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 modal-backdrop-blur overflow-y-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#121217] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Fechar checkout"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= TELA DE SUCESSO / CONFIRMAÇÃO ================= */}
        {orderResult ? (
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pedido Recebido Oficial</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                PEDIDO CONFIRMADO!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                Seu pedido já foi enviado diretamente para a cozinha do <strong>Império do Strogonofe</strong> e está sendo preparado no capricho.
              </p>
            </div>

            {/* Protocol Card */}
            <div className="bg-[#181824] border border-amber-500/25 rounded-2xl p-5 max-w-md mx-auto space-y-3 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Número do Protocolo</span>
                  <span className="text-lg font-black text-gold-gradient tracking-wider font-mono">
                    #{orderResult.orderId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Na Cozinha
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-400 text-[11px] block">Cliente:</span>
                  <span className="font-semibold text-white truncate block">{customerName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 text-[11px] block">Previsão:</span>
                  <span className="font-semibold text-amber-300 block">{orderResult.estimatedMinutes}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 text-xs">
                <span className="text-zinc-400 text-[11px] block">Modalidade:</span>
                <span className="font-semibold text-white">
                  {orderType === 'delivery'
                    ? `Entrega: ${addressStreet}, ${addressNumber} (${addressNeighborhood})`
                    : 'Retirada no Balcão'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <a
                href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20acompanhar%20meu%20pedido%20%23${orderResult.orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Acompanhar no WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-3.5 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Voltar ao Cardápio
              </button>
            </div>
          </div>
        ) : (
          /* ================= FORMULÁRIO DE CHECKOUT ================= */
          <form onSubmit={handleFormSubmit} className="flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#161620] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
                👑
              </div>
              <div>
                <h3 className="font-serif font-black text-lg sm:text-xl text-white">
                  Finalizar Pedido Oficial
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Preencha seus dados para envio direto à cozinha do Império do Strogonofe.
                </p>
              </div>
            </div>

            {/* Body Form */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Errors Alert */}
              {(validationError || orderError) && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">{validationError || orderError}</p>
                    {orderError && (
                      <button
                        type="button"
                        onClick={checkoutWhatsApp}
                        className="mt-2 text-amber-300 underline font-bold hover:text-amber-200 block"
                      >
                        Ou clique aqui para pedir diretamente pelo WhatsApp
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Customer Info */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>1. Seus Dados de Contato</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">WhatsApp / Telefone *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Order Type & Address */}
              <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5" />
                  <span>2. Como Deseja Receber?</span>
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                        : 'bg-[#181824] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Entrega (Delivery)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      orderType === 'pickup'
                        ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                        : 'bg-[#181824] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Retirada no Balcão</span>
                  </button>
                </div>

                {orderType === 'delivery' ? (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-[11px] text-zinc-400 block mb-1">Rua / Avenida *</label>
                        <input
                          type="text"
                          required
                          value={addressStreet}
                          onChange={(e) => setAddressStreet(e.target.value)}
                          placeholder="Ex: Rua das Flores"
                          className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Número *</label>
                        <input
                          type="text"
                          required
                          value={addressNumber}
                          onChange={(e) => setAddressNumber(e.target.value)}
                          placeholder="Ex: 123"
                          className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Bairro *</label>
                        <input
                          type="text"
                          required
                          value={addressNeighborhood}
                          onChange={(e) => setAddressNeighborhood(e.target.value)}
                          placeholder="Ex: Centro"
                          className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Complemento / Apto</label>
                        <input
                          type="text"
                          value={addressComplement}
                          onChange={(e) => setAddressComplement(e.target.value)}
                          placeholder="Ex: Apto 42, Bloco B"
                          className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#181824] border border-zinc-800 rounded-xl text-xs text-zinc-300">
                    📍 <strong>Endereço para Retirada:</strong> {RESTAURANT_CONFIG.address.street}, {RESTAURANT_CONFIG.address.neighborhood}. Seu prato estará pronto em média em 20 a 30 minutos.
                  </div>
                )}
              </div>

              {/* Step 3: Payment Method */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>3. Forma de Pagamento</span>
                </span>

                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="PIX na Entrega">PIX (Chave enviada na confirmação do pedido)</option>
                  <option value="Cartão de Crédito na Entrega">Cartão de Crédito (Levar maquininha)</option>
                  <option value="Cartão de Débito na Entrega">Cartão de Débito (Levar maquininha)</option>
                  <option value="Dinheiro">Dinheiro (Pagamento em espécie)</option>
                </select>
              </div>

              {/* Step 4: Observations */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                <label className="text-[11px] font-bold text-zinc-300 block">
                  Observações para a Cozinha ou Entrega (Opcional)
                </label>
                <input
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Ex: sem cebola, ponto da carne, troco para R$ 50..."
                  className="w-full bg-[#181824] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>

            </div>

            {/* Sticky Modal Footer */}
            <div className="p-5 bg-[#14141c] border-t border-zinc-800 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({items.length} itens):</span>
                  <span>{formatBRL(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Taxa de Entrega:</span>
                  <span className="text-amber-400 font-semibold">
                    {orderType === 'delivery' ? formatBRL(deliveryFee) : 'Grátis (Retirada)'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-1 border-t border-zinc-800">
                  <span>Total do Pedido:</span>
                  <span className="text-xl text-gold-gradient font-black">{formatBRL(total)}</span>
                </div>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmittingOrder}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ENVIANDO SEU PEDIDO À COZINHA...</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRMAR E ENVIAR PEDIDO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
