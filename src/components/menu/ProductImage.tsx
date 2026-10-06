import React from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  compact?: boolean; // miniaturas (carrinho): só o logo, sem texto
}

// Foto do prato; quando o prato ainda não tem foto real, mostra a marca no lugar
// (mesmo espaço e proporção, para o layout nunca quebrar).
export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = '', loading, compact }) => {
  if (src) {
    return <img src={src} alt={alt} loading={loading} className={className} />;
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${className} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a1a22] via-[#121217] to-black`}
    >
      <img
        src="/images/menu/logo.webp"
        alt=""
        loading={loading}
        className={compact ? 'w-3/4 h-3/4 object-contain opacity-80' : 'w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-80'}
      />
      {!compact && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/70">
          Foto em breve
        </span>
      )}
    </div>
  );
};
