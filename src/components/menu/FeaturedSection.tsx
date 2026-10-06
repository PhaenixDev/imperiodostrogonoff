import React from 'react';
import { Flame } from 'lucide-react';
import { MENU_PRODUCTS } from '../../data/menuData';
import { ProductCard } from './ProductCard';

export const FeaturedSection: React.FC = () => {
  const featuredProducts = MENU_PRODUCTS.filter(p => p.isPopular);

  return (
    <section id="secao-destaques" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>Os Queridinhos da Nossa Loja!</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
              🔥 OS QUERIDINHOS DO <span className="text-gold-gradient">IMPÉRIO</span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Os pratos mais pedidos e consagrados da casa. Sabor inconfundível, porções generosas e tempero artesanal.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <span className="font-script text-xl text-amber-300">Mais pedidos!</span>
            <span className="text-xl">➔</span>
          </div>
        </div>

        {/* Products Grid (pratos marcados com isPopular no cardápio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
