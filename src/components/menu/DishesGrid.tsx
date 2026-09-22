import React from 'react';
import { Beef, Drumstick, CookingPot } from 'lucide-react';
import { MENU_PRODUCTS } from '../../data/menuData';
import { ProductCard } from './ProductCard';

export const DishesGrid: React.FC = () => {
  const meatDishes = MENU_PRODUCTS.filter(p => p.category === 'carnes');
  const chickenDishes = MENU_PRODUCTS.filter(p => p.category === 'frango');
  const portions = MENU_PRODUCTS.filter(p => p.category === 'porcoes');

  return (
    <div id="cardapio" className="space-y-20 py-12">
      
      {/* ================= 4.11 PRATOS DE CARNE ================= */}
      <section id="secao-carnes" className="scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Beef className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                PRATOS DE <span className="text-gold-gradient">CARNE</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Sabor e tradição em cada garfada.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {meatDishes.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4.12 PRATOS DE FRANGO ================= */}
      <section id="secao-frango" className="scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Drumstick className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                PRATOS DE <span className="text-gold-gradient">FRANGO</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Leve, saboroso e irresistível.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {chickenDishes.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4.13 PORÇÕES ================= */}
      <section id="secao-porcoes" className="scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <CookingPot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                PORÇÕES & <span className="text-gold-gradient">BATATAS</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Para compartilhar ou completar seu pedido.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {portions.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
