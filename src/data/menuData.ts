// Um item dentro de um grupo de opções (ex.: "Arroz Branco" dentro de "Ingredientes").
// Réplica fiel do modelo do Anota AI: cada item tem sua própria quantidade máxima
// (o cliente pode pedir a mesma coisa mais de uma vez, ex.: 2x Arroz Branco).
export interface OptionItem {
  id: string;
  name: string;
  price: number; // preço por unidade (0 quando o item não altera o valor do prato)
  maxQuantity: number;
}

// Um grupo de opções (Ingredientes, Opcionais, Talheres, Bebidas...), com uma
// quantidade mínima/máxima TOTAL de itens que podem ser selecionados no grupo
// (soma das quantidades de todos os itens dentro dele) — igual ao Anota AI.
export interface OptionGroup {
  id: string;
  title: string;
  min: number; // 0 = grupo opcional; >0 = obrigatório escolher ao menos essa quantidade
  max: number;
  items: OptionItem[];
}

export interface Product {
  id: string;
  externalId: string; // Identificador oficial para sincronização com PDV / Anota AI
  anotaProductId?: string; // ID real do prato no cardápio pedido.anota.ai (link de pedido direto)
  name: string;
  category: 'destaques' | 'carnes' | 'frango' | 'porcoes' | 'bebidas';
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  isPopular?: boolean;
  description: string;
  image: string;
  highResImage?: string;
  optionGroups?: OptionGroup[];
}

export interface CategoryTab {
  id: string;
  label: string;
  iconName: string;
  count?: number;
}

export const CATEGORIES: CategoryTab[] = [
  { id: 'destaques', label: 'Destaques 🔥', iconName: 'Flame' },
  { id: 'carnes', label: 'Pratos de Carne', iconName: 'Beef' },
  { id: 'frango', label: 'Pratos de Frango', iconName: 'Drumstick' },
  { id: 'porcoes', label: 'Porções & Batatas', iconName: 'CookingPot' },
  { id: 'bebidas', label: 'Bebidas', iconName: 'Coffee' },
];

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

// "Frango em Tiras", no Anota AI, tem os mesmos itens de Opcionais/Bebidas
// porém com o limite do grupo sobrescrito para 1 (peculiaridade real de lá).
const OPCIONAIS_LIMITADO: OptionGroup = { ...OPCIONAIS_PADRAO, max: 1 };
const BEBIDAS_LIMITADO: OptionGroup = { ...BEBIDAS_PADRAO, max: 1 };

// Grupo "Ingredientes" compartilhado pela categoria usada em Frango à Milanesa
// em Tiras, Frango em Tiras e Bife à Cavalo no Anota AI (mesma categoria lá).
const INGREDIENTES_FRANGO_TIRAS_ITEMS = [
  { id: 'ing-feijao', name: 'Feijão Carioca', price: 0, maxQuantity: 3 },
  { id: 'ing-arroz-3', name: 'Arroz Branco', price: 0, maxQuantity: 3 },
];

export const MENU_PRODUCTS: Product[] = [
  // ================= DESTAQUES (Os Queridinhos) =================
  {
    id: 'destaque-parmegiana',
    externalId: 'IMP-PARM-FRANGO',
    anotaProductId: '6ab2d03e985d5f83706285ff',
    name: 'Frango à Parmegiana',
    category: 'destaques',
    price: 29.90,
    originalPrice: 34.90,
    discountBadge: '-14%',
    isPopular: true,
    description: 'Frango empanado, molho de tomate caseiro e queijo gratinado. Acompanha arroz, batata e salada fresca.',
    image: '/images/menu/destaque_parmegiana.webp',
    optionGroups: [
      {
        id: 'ingredientes',
        title: 'Ingredientes',
        min: 1,
        max: 3,
        items: [
          { id: 'ing-parmegiana', name: 'Frango à Parmegiana', price: 0, maxQuantity: 3 },
          { id: 'ing-arroz-parm', name: 'Arroz Branco', price: 0, maxQuantity: 3 },
          { id: 'ing-batata-frita-parm', name: 'Batata Frita', price: 0, maxQuantity: 3 },
        ]
      },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },
  {
    id: 'destaque-strogonoff',
    externalId: 'IMP-STROG-CREMOSO',
    anotaProductId: '6ab2d03e985d5f83706285e4',
    name: 'Strogonoff Cremoso',
    category: 'destaques',
    price: 22.90,
    originalPrice: 26.90,
    discountBadge: '-15%',
    isPopular: true,
    description: 'Carne macia ou frango suculento, molho cremoso e sabor irresistível da casa. Acompanha arroz branco, batata palha crocante e salada.',
    image: '/images/menu/destaque_strogonoff.webp',
    optionGroups: [
      {
        id: 'ingredientes',
        title: 'Ingredientes',
        min: 1,
        max: 3,
        items: [
          { id: 'ing-arroz-pure', name: 'Arroz Branco', price: 0, maxQuantity: 3 },
          { id: 'ing-pure', name: 'Purê de Batata', price: 0, maxQuantity: 3 },
          { id: 'ing-batata-palha-pure', name: 'Porção de Batata Palha', price: 0, maxQuantity: 3 },
        ]
      },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },
  {
    id: 'destaque-prato-dia',
    externalId: 'IMP-PRATO-DIA',
    anotaProductId: '6ab2d03e985d5f83706285dd',
    name: 'Prato do Dia',
    category: 'destaques',
    price: 14.99,
    originalPrice: 23.90,
    discountBadge: '-37%',
    isPopular: true,
    description: 'Uma refeição caseira completa preparada diariamente com muito carinho e sabor. Acompanha arroz, feijão fresquinho, ovo frito com gema perfeita e salada.',
    image: '/images/menu/destaque_prato_dia.webp',
    optionGroups: [OPCIONAIS_PADRAO, TALHERES_PADRAO, BEBIDAS_PADRAO]
  },
  {
    id: 'destaque-batata-cheddar-bacon',
    externalId: 'IMP-BAT-CHEDDAR-BACON',
    anotaProductId: '6ab2d03e985d5f8370628613',
    name: 'Batata com Cheddar e Bacon',
    category: 'destaques',
    price: 29.90,
    originalPrice: 34.90,
    discountBadge: '-14%',
    isPopular: true,
    description: 'Batatas fritas douradas e super crocantes, cobertas generosamente com cheddar cremoso derretido e pedacinhos crocantes de bacon.',
    image: '/images/menu/destaque_batata_cheddar.webp',
    optionGroups: [BEBIDAS_PADRAO]
  },
  {
    id: 'destaque-frango-milanesa-tiras',
    externalId: 'IMP-FRAN-MILANESA-TIRAS',
    anotaProductId: '6ab2d03e985d5f83706285f7',
    name: 'Frango a Milanesa em Tiras',
    category: 'destaques',
    price: 24.90,
    isPopular: true,
    description: 'Tiras de frango selecionadas, empanadas artesanalmente, douradas e crocantes por fora e macias por dentro. Acompanha arroz, feijão e salada.',
    image: '/images/menu/destaque_frango_milanesa.webp',
    optionGroups: [
      { id: 'ingredientes', title: 'Ingredientes', min: 1, max: 3, items: INGREDIENTES_FRANGO_TIRAS_ITEMS },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },

  // ================= PRATOS DE CARNE =================
  {
    id: 'carne-strogonoff',
    externalId: 'IMP-CARNE-STROG',
    anotaProductId: '6ab2d03e985d5f8370628605',
    name: 'Strogonoff Cremoso de Carne',
    category: 'carnes',
    price: 29.90,
    description: 'Carne macia, molho cremoso e sabor que conquista na primeira garfada. Acompanha arroz, batata palha e salada.',
    image: '/images/menu/carne_strogonoff.webp',
    optionGroups: [
      {
        id: 'ingredientes',
        title: 'Ingredientes',
        min: 1,
        max: 2,
        items: [
          { id: 'ing-arroz-carne', name: 'Arroz Branco', price: 0, maxQuantity: 2 },
        ]
      },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },
  {
    id: 'carne-bife-cavalo',
    externalId: 'IMP-CARNE-BIFE-CAVALO',
    anotaProductId: '6ab2d03e985d5f837062860a',
    name: 'Bife à Cavalo',
    category: 'carnes',
    price: 29.90,
    description: 'Bife bovino macio e suculento, preparado na chapa e finalizado com um delicioso ovo frito. Acompanha arroz, feijão, batata e salada.',
    image: '/images/menu/carne_bife_cavalo.webp',
    optionGroups: [
      { id: 'ingredientes', title: 'Ingredientes', min: 0, max: 3, items: INGREDIENTES_FRANGO_TIRAS_ITEMS },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },

  // ================= PRATOS DE FRANGO =================
  {
    id: 'frango-strogonoff',
    externalId: 'IMP-FRANGO-STROG',
    anotaProductId: '6ab2d03e985d5f83706285eb',
    name: 'Strogonoff Cremoso de Frango',
    category: 'frango',
    price: 19.90,
    description: 'Frango em cubos, molho cremoso e muito sabor. Acompanha arroz, batata palha e salada.',
    image: '/images/menu/frango_strogonoff.webp',
    optionGroups: [
      {
        id: 'ingredientes',
        title: 'Ingredientes',
        min: 1,
        max: 2,
        items: [
          { id: 'ing-arroz-frango-strog', name: 'Arroz Branco', price: 0, maxQuantity: 2 },
          { id: 'ing-batata-palha-frango-strog', name: 'Porção de Batata Palha', price: 0, maxQuantity: 2 },
        ]
      },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },
  {
    id: 'frango-parmegiana',
    externalId: 'IMP-FRANGO-PARMEGIANA',
    anotaProductId: '6ab2d03e985d5f83706285ff',
    name: 'Frango à Parmegiana',
    category: 'frango',
    price: 29.90,
    description: 'Filé de frango empanado, dourado e crocante, coberto com molho de tomate e queijo. Acompanha arroz, batata e salada.',
    image: '/images/menu/frango_parmegiana.webp',
    optionGroups: [
      {
        id: 'ingredientes',
        title: 'Ingredientes',
        min: 1,
        max: 3,
        items: [
          { id: 'ing-parmegiana-2', name: 'Frango à Parmegiana', price: 0, maxQuantity: 3 },
          { id: 'ing-arroz-parm-2', name: 'Arroz Branco', price: 0, maxQuantity: 3 },
          { id: 'ing-batata-frita-parm-2', name: 'Batata Frita', price: 0, maxQuantity: 3 },
        ]
      },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },
  {
    id: 'frango-tiras',
    externalId: 'IMP-FRANGO-TIRAS',
    anotaProductId: '6ab2d03e985d5f83706285f2',
    name: 'Frango em Tiras',
    category: 'frango',
    price: 24.90,
    description: 'Tiras de frango macias e douradas, preparadas na medida certa. Acompanha arroz, feijão e salada.',
    image: '/images/menu/frango_tiras.webp',
    optionGroups: [
      { id: 'ingredientes', title: 'Ingredientes', min: 1, max: 3, items: INGREDIENTES_FRANGO_TIRAS_ITEMS },
      OPCIONAIS_LIMITADO,
      TALHERES_PADRAO,
      BEBIDAS_LIMITADO
    ]
  },
  {
    id: 'frango-milanesa',
    externalId: 'IMP-FRANGO-MILANESA',
    anotaProductId: '6ab2d03e985d5f83706285f7',
    name: 'Frango à Milanesa em Tiras',
    category: 'frango',
    price: 24.90,
    description: 'Filé de frango empanado, crocante e saboroso. Acompanha arroz, feijão e salada.',
    image: '/images/menu/frango_milanesa.webp',
    optionGroups: [
      { id: 'ingredientes', title: 'Ingredientes', min: 1, max: 3, items: INGREDIENTES_FRANGO_TIRAS_ITEMS },
      OPCIONAIS_PADRAO,
      TALHERES_PADRAO,
      BEBIDAS_PADRAO
    ]
  },

  // ================= PORÇÕES =================
  {
    id: 'porcao-batata-m',
    externalId: 'IMP-PORCAO-BATATA-M',
    anotaProductId: '6ab2d03e985d5f837062860f',
    name: 'Batata Frita M',
    category: 'porcoes',
    price: 19.90,
    description: 'Porção média de batatas palito sequinhas, quentes e crocantes.',
    image: '/images/menu/porcao_batata_m.webp',
    optionGroups: [BEBIDAS_PADRAO]
  },
  {
    id: 'porcao-batata-g',
    externalId: 'IMP-PORCAO-BATATA-G',
    anotaProductId: '6ab2d03e985d5f8370628611',
    name: 'Batata Frita G',
    category: 'porcoes',
    price: 29.90,
    description: 'Porção grande e generosa, perfeita para compartilhar com a família ou amigos.',
    image: '/images/menu/porcao_batata_g.webp',
    optionGroups: [BEBIDAS_PADRAO]
  },
  {
    id: 'porcao-cheddar-bacon-m',
    externalId: 'IMP-PORCAO-CHEDDAR-M',
    anotaProductId: '6ab2d03e985d5f8370628613',
    name: 'Batata Frita com Cheddar e Bacon M',
    category: 'porcoes',
    price: 29.90,
    description: 'Batatas fritas douradas cobertas com queijo cheddar cremoso e cubinhos crocantes de bacon (tamanho M).',
    image: '/images/menu/porcao_cheddar_m.webp',
    optionGroups: [BEBIDAS_PADRAO]
  },
  {
    id: 'porcao-cheddar-bacon-g',
    externalId: 'IMP-PORCAO-CHEDDAR-G',
    anotaProductId: '6ab2d03e985d5f8370628615',
    name: 'Batata Frita com Cheddar e Bacon G',
    category: 'porcoes',
    price: 39.90,
    description: 'A porção definitiva: super fartura de batatas com muito cheddar derretido e bacon crocante (tamanho G).',
    image: '/images/menu/porcao_cheddar_g.webp',
    optionGroups: [BEBIDAS_PADRAO]
  },

  // ================= BEBIDAS =================
  {
    id: 'bebida-agua-500',
    externalId: 'IMP-BEB-AGUA-500',
    anotaProductId: '6ab2d03e985d5f8370628617',
    name: 'Água com Gás Mineral 500ml',
    category: 'bebidas',
    price: 5.00,
    description: 'Água mineral com gás natural gelada 500ml.',
    image: '/images/menu/bebida_agua.webp'
  },
  {
    id: 'bebida-agua-sem-gas',
    externalId: 'IMP-BEB-AGUA-SEM-GAS',
    anotaProductId: '6ab2d03e985d5f8370628618',
    name: 'Água sem gás 500ml',
    category: 'bebidas',
    price: 5.00,
    description: 'Água mineral sem gás gelada 500ml.',
    image: '/images/menu/bebida_agua_sem_gas.webp'
  },
  {
    id: 'bebida-coca-310',
    externalId: 'IMP-BEB-COCA-310',
    anotaProductId: '6ab2d03e985d5f8370628619',
    name: 'Coca-Cola Lata 310ml',
    category: 'bebidas',
    price: 8.00,
    description: 'Coca-Cola sabor original lata 310ml estupidamente gelada.',
    image: '/images/menu/bebida_coca_lata.webp'
  },
  {
    id: 'bebida-coca-zero-310',
    externalId: 'IMP-BEB-COCA-ZERO-310',
    anotaProductId: '6ab2d03e985d5f837062861a',
    name: 'Coca-Cola Lata Zero 310ml',
    category: 'bebidas',
    price: 8.00,
    description: 'Coca-Cola Zero açúcar lata 310ml bem gelada.',
    image: '/images/menu/bebida_coca_zero_lata.webp'
  },
  {
    id: 'bebida-coca-zero-2l',
    externalId: 'IMP-BEB-COCA-ZERO-2L',
    anotaProductId: '6ab2d03e985d5f837062861b',
    name: 'Coca-Cola Zero 2L',
    category: 'bebidas',
    price: 16.00,
    description: 'Coca-Cola sem açúcar garrafa 2 litros.',
    image: '/images/menu/bebida_coca_zero_2l.webp'
  },
  {
    id: 'bebida-fanta-2l',
    externalId: 'IMP-BEB-FANTA-2L',
    anotaProductId: '6ab2d03e985d5f837062861d',
    name: 'Fanta Laranja 2L',
    category: 'bebidas',
    price: 15.00,
    description: 'Fanta Laranja garrafa 2 litros.',
    image: '/images/menu/bebida_fanta_2l.webp'
  },
  {
    id: 'bebida-kuat-2l',
    externalId: 'IMP-BEB-KUAT-2L',
    anotaProductId: '6ab2d03e985d5f837062861e',
    name: 'Kuat 2L',
    category: 'bebidas',
    price: 14.00,
    description: 'Refrigerante de guaraná Kuat garrafa 2 litros.',
    image: '/images/menu/bebida_kuat_2l.webp'
  },
  {
    id: 'bebida-delvalle-laranja-290',
    externalId: 'IMP-BEB-DELVALLE-LARANJA',
    anotaProductId: '6ab2d03e985d5f837062861f',
    name: 'Del Valle Laranja 290ml',
    category: 'bebidas',
    price: 9.00,
    description: 'Suco Del Valle sabor Laranja lata 290ml.',
    image: '/images/menu/bebida_delvalle.webp'
  },
  {
    id: 'bebida-delvalle-maracuja-290',
    externalId: 'IMP-BEB-DELVALLE-MARACUJA',
    anotaProductId: '6ab2d03e985d5f8370628620',
    name: 'Suco Del Valle Maracujá 290ml',
    category: 'bebidas',
    price: 9.00,
    description: 'Suco Del Valle sabor Maracujá lata 290ml.',
    image: '/images/menu/bebida_delvalle_maracuja.webp'
  },
  {
    id: 'bebida-delvalle-laranja-1l',
    externalId: 'IMP-BEB-DELVALLE-1L',
    anotaProductId: '6ab2d03e985d5f8370628621',
    name: 'Suco Del Valle Laranja 1L',
    category: 'bebidas',
    price: 17.00,
    description: 'Suco Del Valle sabor Laranja garrafa 1 litro.',
    image: '/images/menu/bebida_delvalle_1l.webp'
  },
  {
    id: 'bebida-coca-2l',
    externalId: 'IMP-BEB-COCA-2L',
    anotaProductId: '6ab2d03e985d5f837062861c',
    name: 'Coca-Cola 2L',
    category: 'bebidas',
    price: 16.00,
    description: 'Coca-Cola sabor original garrafa 2 litros.',
    image: '/images/menu/bebida_coca_2l.webp'
  }
];

export const PRODUCTS_360 = [
  {
    id: 'destaque-strogonoff',
    externalId: 'IMP-STROG-CREMOSO',
    name: 'Strogonoff Cremoso',
    price: 22.90,
    description: 'Molho cremoso artesanal, arroz branco soltinho e batata palha super crocante.',
    image: '/images/menu/destaque_strogonoff.webp',
    video: '/videos/strogonoff-showcase.mp4',
    videoPoster: '/videos/strogonoff-showcase-poster.jpg',
    category: 'Strogonoff Especial'
  },
  {
    id: 'destaque-parmegiana',
    externalId: 'IMP-PARM-FRANGO',
    name: 'Frango à Parmegiana',
    price: 29.90,
    description: 'Empanado dourado e crocante, coberto com molho de tomate fresco e queijo derretido.',
    image: '/images/menu/destaque_parmegiana.webp',
    category: 'Parmegiana'
  },
  {
    id: 'destaque-prato-dia',
    externalId: 'IMP-PRATO-DIA',
    name: 'Prato do Dia',
    price: 14.99,
    description: 'A refeição caseira mais amada do Brasil com ovo frito de gema mole perfeita.',
    image: '/images/menu/destaque_prato_dia.webp',
    category: 'Tradicional Caseiro'
  },
  {
    id: 'destaque-batata-cheddar-bacon',
    externalId: 'IMP-BAT-CHEDDAR-BACON',
    name: 'Batata com Cheddar e Bacon',
    price: 29.90,
    description: 'Porção irresistível com queijo cheddar quente cremoso e bacon frito crocante.',
    image: '/images/menu/destaque_batata_cheddar.webp',
    category: 'Porções Premium'
  },
  {
    id: 'destaque-frango-milanesa-tiras',
    externalId: 'IMP-FRAN-MILANESA-TIRAS',
    name: 'Frango à Milanesa em Tiras',
    price: 24.90,
    description: 'Tiras sequinhas e temperadas com receita de família, arroz e feijão.',
    image: '/images/menu/destaque_frango_milanesa.webp',
    category: 'Frango Selecionado'
  }
];
