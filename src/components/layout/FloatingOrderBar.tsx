import React from 'react';
import { ShoppingBag, ChevronRight, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBRL } from '../../services/whatsappService';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const FloatingOrderBar: React.FC = () => {
  const { itemCount, subtotal, setIsCartOpen } = useCart();

  return (
    <>
      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
        <div className="pointer-events-auto max-w-lg mx-auto flex items-center gap-2">
          
          {/* Quick Direct WhatsApp Support / Order Button */}
          <a
            href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Imp%C3%A9rio%20do%20Strogonofe!`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-13 h-13 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg active:scale-95 shrink-0 border border-emerald-400/30 p-3.5"
            aria-label="Abrir WhatsApp direto"
          >
            <MessageCircle className="w-6 h-6 fill-white/20" />
          </a>

          {/* Cart / Order Trigger Bar */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-black text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-between transition-transform active:scale-98 border border-yellow-200/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-black" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-amber-400 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-left font-extrabold leading-tight">
                {itemCount === 0 ? '🍴 FAZER PEDIDO' : `${itemCount} item(ns) no pedido`}
              </span>
            </div>

            <div className="flex items-center gap-1 font-black">
              <span>{subtotal > 0 ? formatBRL(subtotal) : 'VER CARDÁPIO'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Desktop Persistent Bottom-Right Floating CTA */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-30 flex-col items-end gap-3">
        {/* If cart has items, show Cart floating button */}
        {itemCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-3 rounded-full bg-[#181824] hover:bg-[#202030] text-white border-2 border-amber-500/60 hover:border-amber-400 shadow-gold-glow flex items-center gap-3 transition-all transform hover:-translate-y-1 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <div className="text-left">
              <div className="text-[10px] text-zinc-400 uppercase leading-none font-semibold">Ver Pedido</div>
              <div className="text-xs font-black text-amber-400">{formatBRL(subtotal)}</div>
            </div>
          </button>
        )}

        {/* WhatsApp Direct Floating Pill */}
        <a
          href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Imp%C3%A9rio%20do%20Strogonofe`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 border border-emerald-400/30 group"
          aria-label="Pedir pelo WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white/20 group-hover:scale-110 transition-transform" />
          <span>Pedir no WhatsApp</span>
        </a>
      </div>
    </>
  );
};
