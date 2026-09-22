import React from 'react';
import { Heart, Phone, Clock, MapPin, ChevronUp } from 'lucide-react';
import { InstagramIcon } from '../icons/InstagramIcon';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-amber-500/20 text-zinc-400 pt-16 pb-28 md:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-amber-500/40 p-0.5 bg-[#0a0a0c] flex items-center justify-center overflow-hidden shadow-gold-glow">
                <img
                  src="/images/menu/logo.webp"
                  alt="Logo Império do Strogonofe"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-black tracking-widest text-base text-white uppercase block">
                  Império
                </span>
                <span className="font-serif font-black tracking-wider text-sm text-gold-gradient uppercase block">
                  do Strogonofe
                </span>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed font-normal">
              "{RESTAURANT_CONFIG.tagline}"
            </p>
            <p className="text-zinc-500 text-[11px]">
              O melhor do strogonoff brasileiro, parmegianas artesanais e porções suculentas direto para a sua mesa.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação Rápida
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#destaques" className="hover:text-amber-400 transition-colors">
                  🔥 Os Queridinhos do Império
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-amber-400 transition-colors">
                  📖 Cardápio Completo
                </a>
              </li>
              <li>
                <a href="#experiencia-360" className="hover:text-amber-400 transition-colors">
                  🔄 Visualizador 360° do Prato
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-amber-400 transition-colors">
                  👑 Sobre o Restaurante
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-amber-400 transition-colors">
                  📍 Horários e Localização
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Atendimento & Horários
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-200">{RESTAURANT_CONFIG.openingHours.days}</div>
                  <div>{RESTAURANT_CONFIG.openingHours.hours}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-200">WhatsApp / Pedidos:</div>
                  <a
                    href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 text-emerald-400 transition-colors font-bold"
                  >
                    {RESTAURANT_CONFIG.displayPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-200">{RESTAURANT_CONFIG.address.street}</div>
                  <div>{RESTAURANT_CONFIG.address.neighborhood} - {RESTAURANT_CONFIG.address.cityState}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Social & WhatsApp CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Redes Sociais
            </h4>
            <p className="text-zinc-500 text-[11px]">
              Siga nosso perfil e fique por dentro das promoções relâmpago e sorteios semanais.
            </p>

            <a
              href={RESTAURANT_CONFIG.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-pink-400 border border-zinc-800 text-xs font-semibold transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{RESTAURANT_CONFIG.social.instagram}</span>
            </a>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Voltar ao topo da página</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} <strong>{RESTAURANT_CONFIG.name}</strong>. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>para amantes da verdadeira comida caseira</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
