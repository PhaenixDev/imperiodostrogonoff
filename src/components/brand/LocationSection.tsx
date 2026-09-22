import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-20 bg-gradient-to-b from-[#09090c] via-[#101017] to-[#0a0a0c] border-t border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Onde Estamos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white">
            VISITE O <span className="text-gold-gradient">IMPÉRIO</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400">
            Retire seu pedido quentinho no balcão ou peça para receber no conforto da sua casa.
          </p>
        </div>

        {/* Two-Column Grid: Info Cards + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Details Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#14141c] border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Endereço</h4>
                  <span className="text-[11px] text-amber-400">Retirada & Delivery</span>
                </div>
              </div>
              <p className="text-sm text-zinc-200 pt-1 font-medium">
                {RESTAURANT_CONFIG.address.street}
              </p>
              <p className="text-xs text-zinc-400">
                {RESTAURANT_CONFIG.address.neighborhood} — {RESTAURANT_CONFIG.address.cityState}
              </p>
              {RESTAURANT_CONFIG.address.reference && (
                <p className="text-[11px] text-zinc-500 italic">
                  {RESTAURANT_CONFIG.address.reference}
                </p>
              )}
            </div>

            {/* Opening Hours Card */}
            <div className="p-6 rounded-2xl bg-[#14141c] border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Horário de Funcionamento</h4>
                  <span className="text-[11px] text-emerald-400 font-semibold">Atendimento Ativo</span>
                </div>
              </div>
              <p className="text-sm text-zinc-200 pt-1 font-medium">
                {RESTAURANT_CONFIG.openingHours.days}
              </p>
              <p className="text-xs text-amber-300 font-semibold">
                Das {RESTAURANT_CONFIG.openingHours.hours}
              </p>
              <p className="text-[11px] text-zinc-400">
                Tempo médio de entrega: {RESTAURANT_CONFIG.openingHours.deliveryTime}
              </p>
            </div>

            {/* Direct Contact Card & Map Action */}
            <div className="p-6 rounded-2xl bg-[#14141c] border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contato Direto</h4>
                  <span className="text-[11px] text-zinc-400">Pedidos & Dúvidas</span>
                </div>
              </div>
              <p className="text-sm text-zinc-200 font-medium">
                {RESTAURANT_CONFIG.displayPhone}
              </p>

              <a
                href={RESTAURANT_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>ABRIR NO GOOGLE MAPS</span>
              </a>
            </div>

          </div>

          {/* Interactive Google Map iframe container */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-amber-500/20 bg-black/60 shadow-2xl relative min-h-[380px] flex items-center justify-center">
            <iframe
              title="Localização do Restaurante"
              src={RESTAURANT_CONFIG.maps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-[88%]"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
