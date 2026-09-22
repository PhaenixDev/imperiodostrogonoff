import React from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, Bike, Store, ShieldCheck, MapPin, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBRL } from '../../services/whatsappService';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
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
    deliveryDistance,
    isCalculatingDistance,
    checkoutWhatsApp
  } = useCart();

  if (!isCartOpen) return null;

  const isDelivery = orderType === 'delivery';
  const missingDeliveryFields = isDelivery && (!addressStreet.trim() || !addressNumber.trim() || !addressNeighborhood.trim());
  const missingContactFields = !customerName.trim() || !customerPhone.trim();
  const canCheckout = !missingContactFields && !missingDeliveryFields;

  const inputClasses = "w-full bg-[#181822] border border-zinc-800 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 modal-backdrop-blur transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101015] border-l border-amber-500/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-800/80 bg-[#14141c] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif font-black text-lg text-white">Seu Pedido</h3>
                <p className="text-[11px] text-zinc-400">
                  {items.length === 0 ? 'Carrinho vazio' : `${items.length} produto(s) selecionado(s)`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Fechar carrinho"
              className="p-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="text-base font-bold text-white">Seu carrinho está vazio</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Escolha seu prato favorito, como o nosso strogonoff cremoso, e adicione ao seu pedido!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  Explorar Cardápio
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-[#171720] border border-zinc-800/90 rounded-2xl p-3.5 flex gap-3 items-start justify-between group"
                    >
                      {/* Product thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-black shrink-0 border border-zinc-800"
                      />

                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {item.name}
                        </h4>
                        
                        {/* Options summary */}
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <div className="text-[10px] text-amber-200/80 mt-1 space-y-0.5">
                            {item.selectedOptions.map((opt, i) => (
                              <div key={i}>
                                • {opt.optionName} {opt.priceDelta > 0 && `(+${formatBRL(opt.priceDelta)})`}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Customer note if any */}
                        {item.notes && (
                          <div className="text-[10px] text-zinc-400 italic mt-0.5">
                            "{item.notes}"
                          </div>
                        )}

                        <div className="text-xs font-black text-amber-400 mt-2">
                          {formatBRL(item.unitPrice * item.quantity)}
                        </div>
                      </div>

                      {/* Controls: Quantity + Remove */}
                      <div className="flex flex-col items-end justify-between h-full space-y-2">
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center bg-[#20202c] border border-zinc-700 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Mode Quick Toggle */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    Modalidade do Pedido
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        orderType === 'delivery'
                          ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                          : 'bg-[#181822] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Entrega (+ R$ 5,00)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        orderType === 'pickup'
                          ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                          : 'bg-[#181822] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Retirada (Grátis)</span>
                    </button>
                  </div>
                </div>

                {/* Contact & Delivery Data (goes straight into the WhatsApp message) */}
                <div className="space-y-3 pt-2 border-t border-zinc-800">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    Seus Dados
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Seu nome *"
                      className={inputClasses}
                    />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="WhatsApp / Telefone *"
                      className={inputClasses}
                    />
                  </div>

                  {isDelivery && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={addressStreet}
                          onChange={(e) => setAddressStreet(e.target.value)}
                          placeholder="Rua *"
                          className={`${inputClasses} col-span-2`}
                        />
                        <input
                          type="text"
                          value={addressNumber}
                          onChange={(e) => setAddressNumber(e.target.value)}
                          placeholder="Nº *"
                          className={inputClasses}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={addressNeighborhood}
                          onChange={(e) => setAddressNeighborhood(e.target.value)}
                          placeholder="Bairro *"
                          className={inputClasses}
                        />
                        <input
                          type="text"
                          value={addressComplement}
                          onChange={(e) => setAddressComplement(e.target.value)}
                          placeholder="Complemento (opcional)"
                          className={inputClasses}
                        />
                      </div>

                      {/* Delivery distance feedback (Google Maps) */}
                      {isCalculatingDistance && (
                        <div className="flex items-center gap-1.5 text-[10.5px] text-zinc-400">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Calculando distância até você...</span>
                        </div>
                      )}
                      {!isCalculatingDistance && deliveryDistance?.success && (
                        <div className="flex items-center gap-1.5 text-[10.5px] text-emerald-400 font-medium">
                          <MapPin className="w-3 h-3" />
                          <span>≈ {deliveryDistance.distanceText} ({deliveryDistance.durationText} de carro) até você</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Clear Cart Button */}
                <div className="pt-2 text-right">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-zinc-500 hover:text-red-400 transition-colors underline"
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </>
            )}

          </div>

          {/* Sticky Drawer Footer with Subtotal and Primary Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 bg-[#14141c] border-t border-zinc-800 space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-white">{formatBRL(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Taxa de entrega:</span>
                  <span className="text-amber-400 font-semibold">
                    {orderType === 'delivery' ? formatBRL(deliveryFee) : 'Grátis (Retirada)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total estimado:</span>
                  <span className="text-xl text-gold-gradient font-black">{formatBRL(total)}</span>
                </div>
              </div>

              {/* Primary CTA: Finalize the full, multi-item order on WhatsApp (message pre-filled automatically) */}
              <button
                onClick={checkoutWhatsApp}
                disabled={!canCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:to-emerald-300 text-black font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-all transform active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-emerald-500 disabled:hover:to-emerald-500"
              >
                <Send className="w-4 h-4" />
                <span>Finalizar Pedido no WhatsApp</span>
              </button>

              <p className="text-[10.5px] text-zinc-400 text-center leading-snug px-2">
                {canCheckout ? (
                  <>Vamos abrir o WhatsApp com <strong className="text-emerald-300">todos os itens do seu carrinho já prontos na mensagem</strong> — você só confere e envia.</>
                ) : (
                  <span className="text-amber-400">Preencha seus dados {isDelivery ? 'e o endereço de entrega ' : ''}acima para continuar.</span>
                )}
              </p>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Canal oficial direto com a cozinha do Império</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
