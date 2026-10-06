import React from 'react';
import { ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';
import { useCart } from '../../context/CartContext';

export const FinalCTA: React.FC = () => {
  const { setIsCartOpen } = useCart();

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-t from-black via-[#101016] to-[#0a0a0c]">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-gradient-to-r from-[#171722] via-[#1f1f2e] to-[#171722] border-2 border-amber-500/30 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center space-y-6">
          
          {/* Subtle background food watermark */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-15 pointer-events-none rounded-full overflow-hidden">
            <img
              src="/images/menu/destaque_strogonoff.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Fome de Comida Boa?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white tracking-tight">
            TÁ ESPERANDO <span className="text-gold-gradient">O QUÊ?</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-xl font-normal max-w-xl mx-auto leading-relaxed">
            Seu próximo pedido está a poucos cliques. Receba o verdadeiro strogonoff cremoso ou parmegiana no conforto da sua casa!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Imp%C3%A9rio%20do%20Strogonoff`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>PEDIR PELO WHATSAPP</span>
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#14141d] hover:bg-[#1e1e2c] border border-amber-500/40 hover:border-amber-400 text-amber-300 font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ABRIR MEU CARRINHO</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Atendimento ágil
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Embalagem térmica selada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Opções de pagamento facilitadas
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
