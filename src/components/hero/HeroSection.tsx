import React from 'react';
import { ChevronDown, UtensilsCrossed, ShieldCheck, HeartHandshake, Truck, Sparkles } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#09090c] via-[#101014] to-[#0a0a0c] pt-4 pb-16">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>O Verdadeiro Strogonoff Caseiro & Parmegianas</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-[1.1] text-white">
                O Sabor Real do <br />
                <span className="text-gold-gradient drop-shadow-sm">
                  Império do Estrogonofe
                </span>
              </h1>
              
              {/* Official Menu Tagline */}
              <p className="font-script text-2xl sm:text-3xl text-amber-200/95 tracking-wide pt-1">
                "{RESTAURANT_CONFIG.tagline}"
              </p>
            </div>

            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Pratos preparados diariamente com ingredientes selecionados, molho cremoso artesanal,
              arroz soltinho e a batata palha mais crocante da cidade. Peça agora com entrega rápida!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#destaques"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm uppercase tracking-wider shadow-gold-glow-lg hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>VER CARDÁPIO COMPLETO</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Imp%C3%A9rio%20do%20Strogonofe`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1a1a24] hover:bg-[#252533] border border-amber-500/40 hover:border-amber-400 text-amber-200 font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>PEDIR PELO WHATSAPP</span>
              </a>
            </div>

            {/* The 3 Official Menu Pillars (Bottom of menu image) */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-100 leading-tight">Comida Caseira</div>
                  <div className="text-[10px] text-zinc-400">Feita com amor</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-100 leading-tight">Ingredientes</div>
                  <div className="text-[10px] text-zinc-400">100% Selecionados</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-100 leading-tight">Entrega Rápida</div>
                  <div className="text-[10px] text-zinc-400">Chega quentinho</div>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Visual Imagery Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">

            <div className="relative w-full max-w-[420px]">

              {/* Food Presentation Frame (normal rectangle, no circular mask) */}
              <div className="w-full rounded-3xl p-2 bg-gradient-to-tr from-amber-500/30 via-zinc-800 to-black/80 shadow-2xl overflow-hidden relative group">
                <img
                  src="/images/menu/destaque_strogonoff.webp"
                  alt="Strogonoff Cremoso do Império com arroz e batata palha"
                  className="w-full h-auto rounded-2xl object-cover filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating promo badge overlay */}
                <div className="absolute bottom-6 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-yellow-200/50">
                  <span className="text-xs uppercase tracking-wider">A partir de</span>
                  <span className="text-base font-black">R$ 19,90</span>
                </div>
              </div>

              {/* Floating review/satisfaction micro-pill */}
              <div className="absolute top-4 -left-4 bg-[#14141c]/90 backdrop-blur-md border border-amber-500/30 px-3.5 py-2 rounded-xl shadow-xl hidden sm:flex items-center gap-2.5">
                <span className="text-lg">👑</span>
                <div>
                  <div className="text-xs font-bold text-zinc-200 leading-tight">O Campeão de Vendas</div>
                  <div className="text-[10px] text-amber-400 font-semibold">Strogonoff Cremoso Artesanal</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Down indicator */}
      <a
        href="#destaques"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-amber-400 transition-colors animate-bounce p-2"
        aria-label="Rolar para os destaques"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
