import React from 'react';
import { Sparkles, Heart, ShieldCheck, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-[#0a0a0c] via-[#101015] to-[#0a0a0c] relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Presentation on Left */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-black">
              <img
                src="/images/menu/destaque_strogonoff.webp"
                alt="Prato tradicional do Império do Strogonofe"
                className="w-full h-80 sm:h-96 object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              {/* Tag overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-black flex items-center justify-center text-lg">
                    👑
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-serif">A Tradição do Sabor Caseiro</h4>
                    <p className="text-[11px] text-amber-300 font-script text-base leading-none mt-0.5">
                      "Feito com carinho todos os dias para você"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorative square */}
            <div className="absolute -bottom-4 -right-4 w-40 h-40 border border-amber-500/20 rounded-3xl -z-10 hidden sm:block"></div>
          </div>

          {/* Text & Pillars on Right */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Nossa Filosofia</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              CONHEÇA O <span className="text-gold-gradient">IMPÉRIO</span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              No <strong>Império do Estrogonofe</strong>, cada receita nasce da paixão pela autêntica culinária caseira brasileira. Não servimos apenas uma refeição: entregamos momentos de aconchego, generosidade e sabor inesquecível a cada garfada.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Do nosso renomado Strogonoff Cremoso com arroz soltinho e batata palha crocante, às nossas Parmegianas douradas e pratos do dia caprichados, tudo é preparado com temperos frescos e ingredientes de primeira qualidade.
            </p>

            {/* The 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#14141d] border border-amber-500/20 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Comida Caseira</h4>
                <p className="text-xs text-zinc-400">
                  Tempero artesanal e receitas com gosto de aconchego familiar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#14141d] border border-amber-500/20 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Ingredientes Selecionados</h4>
                <p className="text-xs text-zinc-400">
                  Carnes nobres, frango macio e vegetais frescos todos os dias.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#14141d] border border-amber-500/20 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Entrega Rápida</h4>
                <p className="text-xs text-zinc-400">
                  Embalagens térmicas especiais para seu prato chegar fumegante.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
