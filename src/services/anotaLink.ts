import { ANOTA_STORE_SLUG, type Product } from '../data/menuData';

/**
 * Monta o link de pedido direto para um prato dentro do cardápio pedido.anota.ai.
 * O Anota AI não expõe API pública para criar pedidos a partir de um site externo;
 * o fluxo suportado é abrir o prato certo dentro do cardápio deles e o cliente
 * finalizar o pedido por lá (confirmado navegando o cardápio real da loja).
 */
export function getAnotaOrderUrl(product: Pick<Product, 'anotaProductId'>): string | null {
  if (!product.anotaProductId) return null;
  return `https://pedido.anota.ai/product/${product.anotaProductId}/0/${ANOTA_STORE_SLUG}?categoryType=simple_item`;
}
