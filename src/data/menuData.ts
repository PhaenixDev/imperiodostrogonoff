// Um item dentro de um grupo de opções (ex.: "Farofa Temperada" dentro de "Opcionais").
// Réplica fiel do modelo do Anota AI: cada item tem sua própria quantidade máxima
// (o cliente pode pedir a mesma coisa mais de uma vez, ex.: 2x Arroz Branco).
export interface OptionItem {
  id: string;
  name: string;
  price: number; // preço por unidade (0 quando o item não altera o valor do prato)
  maxQuantity: number;
}

// Um grupo de opções (Opcionais, Talheres, Bebidas...), com uma
// quantidade mínima/máxima TOTAL de itens que podem ser selecionados no grupo
// (soma das quantidades de todos os itens dentro dele) — igual ao Anota AI.
export interface OptionGroup {
  id: string;
  title: string;
  min: number; // 0 = grupo opcional; >0 = obrigatório escolher ao menos essa quantidade
  max: number;
  items: OptionItem[];
}

export type ProductCategory = 'frango' | 'carnes' | 'combos';

export interface Product {
  id: string;
  externalId: string; // Identificador oficial para sincronização com PDV / Anota AI
  anotaProductId?: string; // ID real do prato no cardápio pedido.anota.ai (link de pedido direto)
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  isPopular?: boolean; // aparece em "Os Queridinhos do Império"
  description: string;
  accompaniments: string[]; // pratos: o que acompanha; combos: o que vem no combo
  image?: string; // sem foto real do prato → o layout mostra um placeholder com a marca
  optionGroups?: OptionGroup[];
}

export interface CategoryTab {
  id: ProductCategory;
  label: string;
  iconName: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle: string;
}

// Cardápio oficial: exatamente estas três categorias, nesta ordem.
export const CATEGORIES: CategoryTab[] = [
  { id: 'frango', label: 'Pratos de Frango', iconName: 'Drumstick', headingPrefix: 'PRATOS DE', headingHighlight: 'FRANGO', subtitle: 'Leve, saboroso e irresistível.' },
  { id: 'carnes', label: 'Pratos de Carne', iconName: 'Beef', headingPrefix: 'PRATOS DE', headingHighlight: 'CARNE', subtitle: 'Sabor e tradição em cada garfada.' },
  { id: 'combos', label: 'Combos Econômicos', iconName: 'BadgePercent', headingPrefix: 'COMBOS', headingHighlight: 'ECONÔMICOS', subtitle: 'Mais comida, mais economia.' },
];

// Rótulo da lista de acompanhamentos: nos combos ela descreve o que vem no combo.
export function getAccompanimentsLabel(product: Pick<Product, 'category'>): string {
  return product.category === 'combos' ? 'Inclui' : 'Acompanha';
}

// Slug oficial da loja no cardápio pedido.anota.ai (usado para montar o link de pedido direto por prato)
export const ANOTA_STORE_SLUG = 'imprio-do-strogonoff-1';

// ============================================================================
// GRUPOS DE OPÇÕES COMPARTILHADOS — extraídos fielmente do cardápio real do
// Anota AI (mesmos grupos "Opcionais", "Talheres" e "Bebidas" reaparecem em
// quase todos os pratos principais lá, com os mesmos itens, preços e limites).
// ============================================================================

const OPCIONAIS_PADRAO: OptionGroup = {
  id: 'opcionais',
  title: 'Opcionais',
  min: 0,
  max: 6,
  items: [
    { id: 'opc-farofa', name: 'Farofa Temperada', price: 5.00, maxQuantity: 6 },
    { id: 'opc-feijao', name: 'Feijão Carioca', price: 8.00, maxQuantity: 6 },
    { id: 'opc-arroz', name: 'Arroz Branco', price: 7.00, maxQuantity: 6 },
    { id: 'opc-batata-frita', name: 'Batata Frita', price: 8.00, maxQuantity: 6 },
    { id: 'opc-pure', name: 'Purê de Batata', price: 6.00, maxQuantity: 6 },
    { id: 'opc-ovo', name: 'Ovo Frito', price: 3.00, maxQuantity: 6 },
    { id: 'opc-batata-palha', name: 'Porção de Batata Palha', price: 3.00, maxQuantity: 6 },
  ]
};

const TALHERES_PADRAO: OptionGroup = {
  id: 'talheres',
  title: 'Talheres',
  min: 0,
  max: 1,
  items: [
    { id: 'talh-unitario', name: 'Talheres Unitários', price: 0, maxQuantity: 1 },
  ]
};

const BEBIDAS_PADRAO: OptionGroup = {
  id: 'bebidas',
  title: 'Bebidas',
  min: 0,
  max: 5,
  items: [
    { id: 'beb-coca-310', name: 'Coca-Cola 310ml', price: 8.00, maxQuantity: 5 },
    { id: 'beb-coca-2l', name: 'Coca-Cola 2L', price: 15.00, maxQuantity: 5 },
    { id: 'beb-coca-zero-2l', name: 'Coca-Cola Zero 2L', price: 15.00, maxQuantity: 5 },
    { id: 'beb-guarana-2l', name: 'Refrigerante Guaraná Mineiro 2L', price: 12.00, maxQuantity: 5 },
    { id: 'beb-coca-zero-lata', name: 'Coca-Cola Lata Zero 310ml', price: 8.00, maxQuantity: 5 },
  ]
};

// Complementos pagos oferecidos nos pratos individuais (o que já vem incluso fica em `accompaniments`)
const COMPLEMENTOS_PRATO: OptionGroup[] = [OPCIONAIS_PADRAO, TALHERES_PADRAO, BEBIDAS_PADRAO];

// anotaProductId só é preenchido quando o prato existe no Anota AI com o MESMO
// preço do cardápio oficial — senão o link levaria o cliente a pagar outro valor.
export const MENU_PRODUCTS: Product[] = [
  // ================= PRATOS DE FRANGO =================
  {
    id: 'frango-strogonoff',
    externalId: 'IMP-FRANGO-STROG',
    name: 'Strogonoff de Frango',
    category: 'frango',
    price: 24.90,
    description: 'Frango em cubos no molho cremoso da casa.',
    accompaniments: ['Arroz', 'Batata palha'],
    image: '/images/menu/foto_strogonoff_frango.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'frango-strogonoff-pure',
    externalId: 'IMP-FRANGO-STROG-PURE',
    name: 'Strogonoff de Frango com Purê',
    category: 'frango',
    price: 26.90,
    isPopular: true,
    description: 'Frango em cubos no molho cremoso da casa, com purê de batata.',
    accompaniments: ['Arroz', 'Batata palha', 'Purê'],
    image: '/images/menu/destaque_strogonoff.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'frango-tiras',
    externalId: 'IMP-FRANGO-TIRAS',
    anotaProductId: '6ab2d03e985d5f83706285f2',
    name: 'Frango em Tiras',
    category: 'frango',
    price: 24.90,
    description: 'Tiras de frango macias e douradas, preparadas na medida certa.',
    accompaniments: ['Arroz', 'Feijão', 'Salada'],
    image: '/images/menu/frango_tiras.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'frango-milanesa',
    externalId: 'IMP-FRANGO-MILANESA',
    anotaProductId: '6ab2d03e985d5f83706285f7',
    name: 'Frango à Milanesa em Tiras',
    category: 'frango',
    price: 24.90,
    isPopular: true,
    description: 'Tiras de frango empanadas, douradas e crocantes por fora e macias por dentro.',
    accompaniments: ['Arroz', 'Feijão', 'Salada'],
    image: '/images/menu/frango_milanesa.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'frango-parmegiana',
    externalId: 'IMP-FRANGO-PARMEGIANA',
    anotaProductId: '6ab2d03e985d5f83706285ff',
    name: 'Frango à Parmegiana',
    category: 'frango',
    price: 29.90,
    isPopular: true,
    description: 'Filé de frango empanado, coberto com molho de tomate e queijo gratinado.',
    accompaniments: ['Arroz', 'Batata frita', 'Salada'],
    image: '/images/menu/foto_frango_parmegiana.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'frango-grelhado-acebolado',
    externalId: 'IMP-FRANGO-GRELHADO-ACEBOLADO',
    name: 'Frango Grelhado Acebolado',
    category: 'frango',
    price: 26.90,
    description: 'Filé de frango grelhado, finalizado com cebola acebolada.',
    accompaniments: ['Arroz', 'Feijão', 'Batata frita', 'Salada'],
    image: '/images/menu/foto_frango_grelhado_acebolado.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'frango-fit',
    externalId: 'IMP-FRANGO-FIT',
    name: 'Frango Fit',
    category: 'frango',
    price: 24.90,
    description: 'Opção leve de frango, com arroz integral e salada reforçada.',
    accompaniments: ['Arroz integral', 'Salada reforçada'],
    image: '/images/menu/foto_frango_fit.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },

  // ================= PRATOS DE CARNE =================
  {
    id: 'carne-strogonoff',
    externalId: 'IMP-CARNE-STROG',
    anotaProductId: '6ab2d03e985d5f8370628605',
    name: 'Strogonoff de Carne',
    category: 'carnes',
    price: 29.90,
    description: 'Carne macia no molho cremoso da casa.',
    accompaniments: ['Arroz', 'Batata palha'],
    image: '/images/menu/foto_strogonoff_carne.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'carne-strogonoff-pure',
    externalId: 'IMP-CARNE-STROG-PURE',
    name: 'Strogonoff de Carne com Purê',
    category: 'carnes',
    price: 33.90,
    description: 'Carne macia no molho cremoso da casa, com purê de batata.',
    accompaniments: ['Arroz', 'Batata palha', 'Purê'],
    image: '/images/menu/foto_strogonoff_carne_pure.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'carne-bife-cavalo',
    externalId: 'IMP-CARNE-BIFE-CAVALO',
    anotaProductId: '6ab2d03e985d5f837062860a',
    name: 'Bife a Cavalo',
    category: 'carnes',
    price: 29.90,
    description: 'Bife bovino macio preparado na chapa e finalizado com ovo frito.',
    accompaniments: ['Arroz', 'Feijão', 'Salada', 'Ovo'],
    image: '/images/menu/carne_bife_cavalo.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },
  {
    id: 'carne-bife-acebolado',
    externalId: 'IMP-CARNE-BIFE-ACEBOLADO',
    name: 'Bife Acebolado',
    category: 'carnes',
    price: 33.90,
    description: 'Bife bovino preparado na chapa, finalizado com cebola acebolada.',
    accompaniments: ['Arroz', 'Feijão', 'Batata frita', 'Salada'],
    image: '/images/menu/foto_bife_acebolado.webp',
    optionGroups: COMPLEMENTOS_PRATO
  },

  // ================= COMBOS ECONÔMICOS =================
  {
    id: 'combo-parmegiana-coca-lata',
    externalId: 'IMP-COMBO-PARMEGIANA-COCA',
    name: 'Combo à Parmegiana + Coca Lata',
    category: 'combos',
    price: 33.90,
    description: 'Marmita à parmegiana acompanhada de uma Coca-Cola lata.',
    accompaniments: ['1 marmita à Parmegiana', '1 Coca-Cola Lata'],
    image: '/images/menu/foto_frango_parmegiana.webp'
  },
  {
    id: 'combo-frango-carne-coca-mini',
    externalId: 'IMP-COMBO-FRANGO-CARNE',
    name: 'Combo Econômico Frango + Carne + 2 Coca Mini',
    category: 'combos',
    price: 36.90,
    description: 'Duas marmitas, uma de frango e uma de carne, com duas Coca-Cola Mini.',
    accompaniments: ['2 marmitas', '2 Coca-Cola Mini'],
    image: '/images/menu/foto_combo_frango_carne.webp'
  },
  {
    id: 'combo-strogonoff-coca-mini',
    externalId: 'IMP-COMBO-STROGONOFF',
    name: 'Combo Econômico Strogonoff — 2 Marmitas + 2 Coca Mini',
    category: 'combos',
    price: 31.90,
    description: 'Duas marmitas de strogonoff com duas Coca-Cola Mini.',
    accompaniments: ['2 marmitas de strogonoff', '2 Coca-Cola Mini'],
    image: '/images/menu/foto_strogonoff_frango.webp'
  },
  {
    id: 'combo-batata-m-coca-lata',
    externalId: 'IMP-COMBO-BATATA-M',
    name: 'Combo Batata Frita M + Coca Lata 310ml',
    category: 'combos',
    price: 33.90,
    description: 'Porção média de batata frita com uma Coca-Cola lata 310ml.',
    accompaniments: ['1 porção de Batata Frita M', '1 Coca-Cola Lata 310ml'],
    image: '/images/menu/porcao_batata_m.webp'
  },
  {
    id: 'combo-batata-g-coca-2l',
    externalId: 'IMP-COMBO-BATATA-G',
    name: 'Combo Batata Frita G + Coca 2L',
    category: 'combos',
    price: 49.90,
    description: 'Porção grande de batata frita com uma Coca-Cola 2 litros.',
    accompaniments: ['1 porção de Batata Frita G', '1 Coca-Cola 2L'],
    image: '/images/menu/porcao_batata_g.webp'
  },
  {
    id: 'combo-casal-imperador',
    externalId: 'IMP-COMBO-CASAL-IMPERADOR',
    name: 'Combo Casal Imperador',
    category: 'combos',
    price: 59.90,
    description: 'O combo completo para dois: strogonoff com purê, batata frita e Coca-Cola.',
    accompaniments: ['2 marmitas de Strogonoff com Purê', '1 porção de Batata Frita M (C+B)', '1 Coca-Cola 1L'],
    image: '/images/menu/destaque_strogonoff.webp'
  }
];

// Vitrine "Veja o prato de perto": só os dados exclusivos da vitrine ficam aqui;
// nome, preço e categoria vêm sempre de MENU_PRODUCTS (fonte única).
export interface ShowcaseProduct {
  productId: string;
  tagline: string;
  video?: string;
  videoPoster?: string;
}

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    productId: 'frango-strogonoff',
    tagline: 'Molho cremoso artesanal, arroz branco soltinho e batata palha super crocante.',
    video: '/videos/strogonoff-showcase.mp4',
    videoPoster: '/videos/strogonoff-showcase-poster.jpg'
  },
  { productId: 'frango-parmegiana', tagline: 'Empanado dourado e crocante, coberto com molho de tomate e queijo derretido.' },
  { productId: 'frango-milanesa', tagline: 'Tiras sequinhas e temperadas com receita de família.' },
  { productId: 'carne-strogonoff', tagline: 'Carne macia no molho cremoso, com arroz e batata palha.' },
  { productId: 'carne-bife-cavalo', tagline: 'Bife na chapa com ovo frito, arroz, feijão e salada.' }
];
