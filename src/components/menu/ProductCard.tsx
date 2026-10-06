import React from 'react';
import { Plus, Flame } from 'lucide-react';
import { getAccompanimentsLabel, type Product } from '../../data/menuData';
import { formatBRL } from '../../services/whatsappService';
import { useCart } from '../../context/CartContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal } = useCart();

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group relative bg-[#131317] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-gold-glow flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/60 flex items-center justify-center">

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {product.discountBadge && (
            <span className="bg-amber-400 text-black text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md tracking-wider uppercase">
              {product.discountBadge}
            </span>
          )}
          {product.isPopular && (
            <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
              <Flame className="w-3 h-3 fill-white" />
              Mais Pedido
            </span>
          )}
        </div>

        {/* Product Food Photo */}
        <ProductImage
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle bottom gradient to blend image into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-transparent to-black/20"></div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors leading-snug">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 font-normal leading-relaxed">
            {product.description}
          </p>

          {product.accompaniments.length > 0 && (
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 mr-1.5">
                {getAccompanimentsLabel(product)}
              </span>
              {product.accompaniments.join(' • ')}
            </p>
          )}
        </div>

        {/* Pricing & Add Button Footer */}
        <div className="pt-3 border-t border-zinc-800/70 flex items-center justify-between gap-2">
          <div>
            {product.originalPrice && (
              <div className="text-[11px] text-zinc-500 line-through">
                {formatBRL(product.originalPrice)}
              </div>
            )}
            <div className="text-lg font-black text-amber-400 tracking-tight">
              {formatBRL(product.price)}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            aria-label={`Adicionar ${product.name} ao pedido`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Pedir</span>
          </button>
        </div>

      </div>
    </div>
  );
};
