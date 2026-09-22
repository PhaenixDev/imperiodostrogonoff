import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { InstagramIcon } from '../icons/InstagramIcon';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const InstagramGallery: React.FC = () => {
  const galleryPhotos = [
    { src: '/images/menu/destaque_strogonoff.webp', title: 'Strogonoff Cremoso Artesanal' },
    { src: '/images/menu/destaque_parmegiana.webp', title: 'Parmegiana com queijo gratinado' },
    { src: '/images/menu/destaque_batata_cheddar.webp', title: 'Batata Frita com Cheddar e Bacon' },
    { src: '/images/menu/destaque_prato_dia.webp', title: 'Prato do Dia Caseiro' },
    { src: '/images/menu/carne_bife_cavalo.webp', title: 'Bife à Cavalo com ovo' },
    { src: '/images/menu/frango_milanesa.webp', title: 'Frango à Milanesa em Tiras' },
  ];

  return (
    <section className="py-16 bg-[#09090c] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Siga no Instagram</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
              NOSSO FEED <span className="text-gold-gradient">GOURMET</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Acompanhe novidades, bastidores e pratos do dia no nosso perfil.
            </p>
          </div>

          <a
            href={RESTAURANT_CONFIG.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md self-start sm:self-auto"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>{RESTAURANT_CONFIG.social.instagram}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryPhotos.map((photo, index) => (
            <a
              key={index}
              href={RESTAURANT_CONFIG.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden bg-black group border border-zinc-800 hover:border-amber-500/50 transition-all shadow-md"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-white mb-2 transform group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-zinc-200 font-semibold leading-tight line-clamp-2">
                  {photo.title}
                </span>
                <span className="text-[9px] text-amber-400 mt-1 flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 fill-amber-400" /> Ver foto
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
