import React, { useState } from 'react';
import { Film, ShoppingBag } from 'lucide-react';
import { PRODUCTS_360, MENU_PRODUCTS } from '../../data/menuData';
import { formatBRL } from '../../services/whatsappService';
import { useCart } from '../../context/CartContext';

export const ProductViewer360: React.FC = () => {
  const [activeProductId, setActiveProductId] = useState(PRODUCTS_360[0].id);
  const { openProductModal } = useCart();

  const currentProduct = PRODUCTS_360.find(p => p.id === activeProductId) || PRODUCTS_360[0];
  const fullProduct = MENU_PRODUCTS.find(p => p.id === activeProductId);

  const handleOrder = () => {
    if (fullProduct) {
      openProductModal(fullProduct);
    }
  };

  return (
    <section id="experiencia-360" className="py-20 bg-gradient-to-b from-[#0a0a0c] via-[#111116] to-[#0a0a0c] relative overflow-hidden border-y border-amber-500/10">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Vídeo Real do Prato</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            VEJA O PRATO DE <span className="text-gold-gradient">PERTO, DE VERDADE</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg font-normal">
            Sem montagem, sem filtro: o prato exatamente como sai da nossa cozinha.
          </p>

          {/* Product Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {PRODUCTS_360.map((p) => {
              const isActive = p.id === activeProductId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProductId(p.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-gold-glow font-bold'
                      : 'bg-[#181820] text-zinc-300 hover:text-white hover:bg-[#22222d] border border-zinc-800'
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewer Card */}
        <div className="bg-[#121217] rounded-3xl border border-amber-500/20 p-6 sm:p-10 shadow-2xl relative max-w-4xl mx-auto backdrop-blur-sm">

          {/* Dish Video / Image Showcase */}
          <div className="w-full flex items-center justify-center my-2">
            <div className="relative w-full max-w-md">
              {currentProduct.video ? (
                <video
                  key={currentProduct.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={currentProduct.videoPoster}
                  className="w-full h-auto rounded-2xl shadow-[0_25px_40px_rgba(0,0,0,0.85)] border border-amber-500/30"
                >
                  <source src={currentProduct.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  draggable={false}
                  className="w-full h-auto rounded-2xl shadow-[0_25px_40px_rgba(0,0,0,0.85)] border border-amber-500/30"
                />
              )}
            </div>
          </div>

          {/* Product Bottom Summary & Order Action */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                {currentProduct.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                {currentProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-1">
                {currentProduct.description}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Preço oficial</div>
                <div className="text-2xl font-black text-amber-400">
                  {formatBRL(currentProduct.price)}
                </div>
              </div>

              <button
                onClick={handleOrder}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 transition-transform transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>QUERO ESSE PRATO</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
