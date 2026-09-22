import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Zap, ExternalLink } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBRL } from '../../services/whatsappService';
import type { CartItemOption } from '../../services/whatsappService';
import type { OptionGroup } from '../../data/menuData';
import { getAnotaOrderUrl } from '../../services/anotaLink';

// Chave composta para localizar a quantidade de um item dentro do seu grupo
function qtyKey(groupId: string, itemId: string) {
  return `${groupId}::${itemId}`;
}

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, closeProductModal, addItem, setIsCartOpen } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');

  // Reset local state whenever product changes
  useEffect(() => {
    if (selectedProductForModal) {
      setQuantity(1);
      setNotes('');
      setSelectedQuantities({});
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
  const optionGroups = product.optionGroups || [];

  const getQty = (groupId: string, itemId: string) => selectedQuantities[qtyKey(groupId, itemId)] || 0;

  const getGroupTotal = (group: OptionGroup) =>
    group.items.reduce((sum, item) => sum + getQty(group.id, item.id), 0);

  const setQty = (group: OptionGroup, itemId: string, delta: number) => {
    setSelectedQuantities(prev => {
      const key = qtyKey(group.id, itemId);
      const item = group.items.find(i => i.id === itemId);
      if (!item) return prev;

      const currentQty = prev[key] || 0;
      const groupTotal = group.items.reduce((sum, i) => sum + (prev[qtyKey(group.id, i.id)] || 0), 0);

      let nextQty = currentQty + delta;
      nextQty = Math.max(0, Math.min(item.maxQuantity, nextQty));

      // Não deixa o total do grupo passar do máximo permitido
      if (delta > 0 && groupTotal >= group.max) {
        return prev;
      }

      return { ...prev, [key]: nextQty };
    });
  };

  // Grupos obrigatórios (min > 0) precisam atingir a quantidade mínima antes de liberar o pedido
  const unmetRequiredGroups = optionGroups.filter(g => g.min > 0 && getGroupTotal(g) < g.min);
  const canAddToCart = unmetRequiredGroups.length === 0;

  // Calcula o preço unitário somando todos os itens de opção selecionados (qty x preço)
  const optionsExtra = optionGroups.reduce((sum, group) => {
    return sum + group.items.reduce((groupSum, item) => groupSum + getQty(group.id, item.id) * item.price, 0);
  }, 0);
  const unitPrice = product.price + optionsExtra;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    const formattedOptions: CartItemOption[] = [];
    optionGroups.forEach(group => {
      group.items.forEach(item => {
        const qty = getQty(group.id, item.id);
        if (qty > 0) {
          formattedOptions.push({
            groupTitle: group.title,
            optionName: qty > 1 ? `${item.name} x${qty}` : item.name,
            priceDelta: item.price * qty
          });
        }
      });
    });

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

          {/* Grupos de opções (Ingredientes, Opcionais, Talheres, Bebidas) — réplica do Anota AI */}
          {optionGroups.map((group) => {
            const groupTotal = getGroupTotal(group);
            const isSatisfied = group.min === 0 || groupTotal >= group.min;

            return (
              <div key={group.id} className="space-y-3 pt-2 border-t border-zinc-800/60 first:border-t-0 first:pt-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {group.title}
                    </span>
                    <p className="text-[10.5px] text-zinc-400 mt-0.5">
                      {group.min > 0
                        ? `Escolha entre ${group.min} e ${group.max} itens`
                        : `Escolha até ${group.max} itens`}
                    </p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                    group.min > 0
                      ? isSatisfied
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {groupTotal}/{group.min > 0 ? `${group.min} a ${group.max}` : group.max}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.items.map((item) => {
                    const qty = getQty(group.id, item.id);
                    const groupAtMax = groupTotal >= group.max;
                    const itemAtMax = qty >= item.maxQuantity;

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          qty > 0
                            ? 'bg-amber-500/10 border-amber-500/40'
                            : 'bg-[#181822] border-zinc-800'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-medium text-white">{item.name}</span>
                          {item.price > 0 && (
                            <span className="text-[11px] text-amber-400 font-bold">+{formatBRL(item.price)}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5 bg-[#1c1c26] border border-zinc-700 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => setQty(group, item.id, -1)}
                            disabled={qty <= 0}
                            aria-label={`Remover ${item.name}`}
                            className="w-6 h-6 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white w-4 text-center">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(group, item.id, 1)}
                            disabled={itemAtMax || groupAtMax}
                            aria-label={`Adicionar ${item.name}`}
                            className="w-6 h-6 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

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
                Você será redirecionado para pedir <strong className="text-amber-300">só este prato</strong> direto no Anota AI, com todos os complementos por lá.
                Quer pedir mais coisas junto? Monte aqui abaixo e feche{' '}
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
              disabled={!canAddToCart}
              className="flex-1 py-3 px-4 rounded-xl bg-[#1c1c26] hover:bg-[#23232f] border border-zinc-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between transition-all transform active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>{canAddToCart ? 'Adicionar ao Carrinho' : `Escolha ${unmetRequiredGroups[0]?.title.toLowerCase()}`}</span>
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
