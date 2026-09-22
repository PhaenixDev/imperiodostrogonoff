import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Sparkles, Zap, ExternalLink } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBRL } from '../../services/whatsappService';
import type { CartItemOption } from '../../services/whatsappService';
import { getAnotaOrderUrl } from '../../services/anotaLink';

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, closeProductModal, addItem, setIsCartOpen } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { optionName: string; priceDelta: number }>>({});
  const [notes, setNotes] = useState('');

  // Reset local state whenever product changes
  useEffect(() => {
    if (selectedProductForModal) {
      setQuantity(1);
      setNotes('');

      // Auto-select defaults for required option groups
      const initialOptions: Record<string, { optionName: string; priceDelta: number }> = {};
      if (selectedProductForModal.optionGroups) {
        selectedProductForModal.optionGroups.forEach(group => {
          if (group.required && group.options.length > 0) {
            initialOptions[group.id] = {
              optionName: group.options[0].name,
              priceDelta: group.options[0].priceDelta || 0
            };
          }
        });
      }
      setSelectedOptions(initialOptions);
    }
  }, [selectedProductForModal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProductModal]);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const anotaOrderUrl = getAnotaOrderUrl(product);

  // Calculate current unit price including selected option modifiers
  const optionsExtra = Object.values(selectedOptions).reduce((sum, opt) => sum + opt.priceDelta, 0);
  const unitPrice = product.price + optionsExtra;
  const totalPrice = unitPrice * quantity;

  const handleOptionSelect = (groupId: string, optionName: string, priceDelta: number = 0) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupId]: { optionName, priceDelta }
    }));
  };

  const handleAddToCart = () => {
    const formattedOptions: CartItemOption[] = [];
    if (product.optionGroups) {
      product.optionGroups.forEach(group => {
        const selected = selectedOptions[group.id];
        if (selected) {
          formattedOptions.push({
            groupTitle: group.title,
            optionName: selected.optionName,
            priceDelta: selected.priceDelta
          });
        }
      });
    }

    addItem({
      productId: product.id,
      externalId: product.externalId,
      name: product.name,
      basePrice: product.price,
      unitPrice,
      quantity,
      selectedOptions: formattedOptions,
      notes: notes.trim(),
      image: product.image
    });

    closeProductModal();
    setIsCartOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 modal-backdrop-blur overflow-y-auto"
      onClick={closeProductModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#121217] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30"></div>

          {product.discountBadge && (
            <div className="absolute bottom-4 left-4 bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              {product.discountBadge} DE DESCONTO
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h2 className="text-2xl font-serif font-black text-white">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Included combo items if present */}
          {product.comboItems && (
            <div className="bg-[#181824] rounded-2xl p-4 border border-zinc-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Itens inclusos no Combo:</span>
              </div>
              <ul className="space-y-1.5">
                {product.comboItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-zinc-200">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Custom Option Groups (Meat type, fries type, drinks, etc.) */}
          {product.optionGroups && product.optionGroups.map((group) => (
            <div key={group.id} className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {group.title}
                </span>
                {group.required ? (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    Obrigatório
                  </span>
                ) : (
                  <span className="text-[10px] text-zinc-500">Opcional</span>
                )}
              </div>

              <div className="space-y-2">
                {group.options.map((option) => {
                  const isSelected = selectedOptions[group.id]?.optionName === option.name;
                  return (
                    <label
                      key={option.id}
                      onClick={() => handleOptionSelect(group.id, option.name, option.priceDelta || 0)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-[#181822] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-400 bg-amber-400' : 'border-zinc-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{option.name}</span>
                      </div>
                      {option.priceDelta && option.priceDelta > 0 ? (
                        <span className="text-xs font-bold text-amber-400">
                          +{formatBRL(option.priceDelta)}
                        </span>
                      ) : null}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Observations textarea */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Observações do Pedido (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem cebola na salada, ponto da carne bem passado, caprichar na batata palha..."
              rows={2}
              className="w-full bg-[#181822] border border-zinc-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            />
          </div>
        </div>

        {/* Modal Sticky Footer: Anota AI as primary CTA, cart+WhatsApp as secondary path for multi-item orders */}
        <div className="p-4 sm:p-6 bg-[#0e0e13] border-t border-zinc-800 space-y-3">
          {/* Primary CTA: order just this dish, right now, on Anota AI */}
          {anotaOrderUrl && (
            <div className="space-y-1.5">
              <a
                href={anotaOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2.5 transition-all transform active:scale-98"
              >
                <Zap className="w-4 h-4" />
                <span>Pedir Agora no Anota AI</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <p className="text-[10.5px] text-zinc-400 text-center leading-snug px-1">
                Você será redirecionado para pedir <strong className="text-amber-300">só este prato</strong> direto no Anota AI.
                Quer pedir mais coisas junto? Adicione ao carrinho abaixo e feche{' '}
                <strong className="text-amber-300">o pedido completo pelo WhatsApp</strong>.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-800/70">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-[#1c1c26] border border-zinc-700 rounded-xl p-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuir quantidade"
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-black text-white w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Aumentar quantidade"
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary CTA: add to cart, to combine with other dishes and finish on WhatsApp */}
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-xl bg-[#1c1c26] hover:bg-[#23232f] border border-zinc-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between transition-all transform active:scale-98"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Adicionar ao Carrinho</span>
              </span>
              <span className="font-black text-amber-400">
                {formatBRL(totalPrice)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
