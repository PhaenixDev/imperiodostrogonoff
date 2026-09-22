import React from 'react';
import { Coffee, Plus } from 'lucide-react';
import { MENU_PRODUCTS } from '../../data/menuData';
import type { Product } from '../../data/menuData';
import { formatBRL } from '../../services/whatsappService';
import { useCart } from '../../context/CartContext';

export const BeveragesSection: React.FC = () => {
  const beverages = MENU_PRODUCTS.filter(p => p.category === 'bebidas');
  const { addItem, openProductModal } = useCart();

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      externalId: product.externalId,
      name: product.name,
      basePrice: product.price,
      unitPrice: product.price,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <section id="secao-bebidas" className="py-12 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Coffee className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              BEBIDAS <span className="text-gold-gradient">GELADAS</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Refresque seu momento! Refrigerantes, sucos e águas.
            </p>
          </div>
        </div>

        {/* Compact Quick-Add Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {beverages.map((beverage) => (
            <div
              key={beverage.id}
              onClick={() => openProductModal(beverage)}
              className="bg-[#121217] hover:bg-[#181822] border border-zinc-800 hover:border-amber-500/40 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-gold-glow"
            >
              {/* Beverage Thumbnail Image */}
              <div className="w-12 h-14 bg-black/40 rounded-lg p-1 shrink-0 flex items-center justify-center overflow-hidden border border-zinc-800/60">
                <img
                  src={beverage.image}
                  alt={beverage.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>

              {/* Title and Price */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                  {beverage.name}
                </h4>
                <div className="text-xs font-bold text-amber-400 mt-0.5">
                  {formatBRL(beverage.price)}
                </div>
              </div>

              {/* Quick Add Button */}
              <button
                type="button"
                onClick={(e) => handleQuickAdd(beverage, e)}
                title={`Adicionar ${beverage.name} direto ao pedido`}
                aria-label={`Adicionar ${beverage.name}`}
                className="w-8 h-8 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 flex items-center justify-center transition-colors active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
