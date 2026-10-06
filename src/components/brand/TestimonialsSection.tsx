import React from 'react';
import { Star, MessageSquare, CheckCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const TestimonialsSection: React.FC = () => {
  const testimonials = RESTAURANT_CONFIG.testimonials;

  // Regra 4.18: Se não houver depoimentos reais cadastrados,
  // exibe convite elegante para o cliente avaliar ou mantém arquitetura pronta.
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-12 bg-[#0d0d12] border-t border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Sua Opinião Importa</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
            Já Experimentou Nossos Pratos?
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            A opinião de cada cliente é o que nos move a cozinhar com cada vez mais paixão. Conte-nos como foi a sua experiência após o pedido!
          </p>

          <div className="pt-2">
            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20deixar%20um%20feedback%20sobre%20meu%20pedido%20no%20Imp%C3%A9rio`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar Avaliação no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // If real testimonials are provided in config:
  return (
    <section className="py-16 bg-[#0a0a0c] border-t border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
            O QUE DIZEM NOSSOS <span className="text-gold-gradient">CLIENTES</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Avaliações 100% reais de quem pede e aprova o Império do Strogonoff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-2xl bg-[#14141c] border border-zinc-800 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 italic">
                "{t.text}"
              </p>
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-bold text-white">{t.author}</span>
                {t.verified && (
                  <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                    <CheckCircle className="w-3 h-3" /> Pedido Verificado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
