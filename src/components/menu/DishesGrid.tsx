import React from 'react';
import { Beef, Drumstick, BadgePercent } from 'lucide-react';
import { CATEGORIES, MENU_PRODUCTS } from '../../data/menuData';
import { ProductCard } from './ProductCard';

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Drumstick,
  Beef,
  BadgePercent,
};

export const DishesGrid: React.FC = () => {
  return (
    <div id="cardapio" className="space-y-20 py-12">
      {/* Uma seção por categoria do cardápio oficial (Frango, Carne, Combos) */}
      {CATEGORIES.map(category => {
        const Icon = CATEGORY_ICONS[category.iconName];
        const products = MENU_PRODUCTS.filter(p => p.category === category.id);

        return (
          <section key={category.id} id={`secao-${category.id}`} className="scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  {Icon && <Icon className="w-5 h-5 text-amber-400" />}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                    {/* pt evita que o gradiente (background-clip: text) corte acentos de maiúsculas, ex.: "Ô" */}
                    {category.headingPrefix} <span className="text-gold-gradient pt-[0.25em]">{category.headingHighlight}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
