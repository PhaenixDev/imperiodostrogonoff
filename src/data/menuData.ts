export interface ProductOption {
  id: string;
  name: string;
  priceDelta?: number;
}

export interface OptionGroup {
  id: string;
  title: string;
  required: boolean;
  minSelect?: number;
  maxSelect?: number;
  options: ProductOption[];
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
  comboItems?: string[];
  optionGroups?: OptionGroup[];
  isDessertPromo?: boolean;
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
        id: 'ponto-batata',
        title: 'Preferência da Batata',
        required: false,
        options: [
          { id: 'batata-palito', name: 'Batata Palito Dourada', priceDelta: 0 },
          { id: 'batata-rustica', name: 'Batata Rústica Temperada', priceDelta: 0 }
        ]
      }
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
        id: 'tipo-carne',
        title: 'Escolha a sua carne',
        required: true,
        options: [
          { id: 'frango', name: 'Frango em cubos suculento', priceDelta: 0 },
          { id: 'carne', name: 'Carne bovina macia (+ R$ 7,00)', priceDelta: 7.00 }
        ]
      },
      {
        id: 'extra-batata-palha',
        title: 'Porção Extra',
        required: false,
        options: [
          { id: 'extra-palha', name: 'Batata palha extra crocante', priceDelta: 4.50 },
          { id: 'extra-queijo', name: 'Adicional de queijo derretido', priceDelta: 5.00 }
        ]
      }
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
    image: '/images/menu/destaque_prato_dia.webp'
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
    image: '/images/menu/destaque_batata_cheddar.webp'
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
    image: '/images/menu/destaque_frango_milanesa.webp'
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
    image: '/images/menu/carne_strogonoff.webp'
  },
  {
    id: 'carne-bife-cavalo',
    externalId: 'IMP-CARNE-BIFE-CAVALO',
    anotaProductId: '6ab2d03e985d5f837062860a',
    name: 'Bife à Cavalo',
    category: 'carnes',
    price: 29.90,
    description: 'Bife bovino macio e suculento, preparado na chapa e finalizado com um delicioso ovo frito. Acompanha arroz, feijão, batata e salada.',
    image: '/images/menu/carne_bife_cavalo.webp'
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
    image: '/images/menu/frango_strogonoff.webp'
  },
  {
    id: 'frango-parmegiana',
    externalId: 'IMP-FRANGO-PARMEGIANA',
    anotaProductId: '6ab2d03e985d5f83706285ff',
    name: 'Frango à Parmegiana',
    category: 'frango',
    price: 29.90,
    description: 'Filé de frango empanado, dourado e crocante, coberto com molho de tomate e queijo. Acompanha arroz, batata e salada.',
    image: '/images/menu/frango_parmegiana.webp'
  },
  {
    id: 'frango-tiras',
    externalId: 'IMP-FRANGO-TIRAS',
    anotaProductId: '6ab2d03e985d5f83706285f2',
    name: 'Frango em Tiras',
    category: 'frango',
    price: 24.90,
    description: 'Tiras de frango macias e douradas, preparadas na medida certa. Acompanha arroz, feijão e salada.',
    image: '/images/menu/frango_tiras.webp'
  },
  {
    id: 'frango-milanesa',
    externalId: 'IMP-FRANGO-MILANESA',
    anotaProductId: '6ab2d03e985d5f83706285f7',
    name: 'Frango à Milanesa em Tiras',
    category: 'frango',
    price: 24.90,
    description: 'Filé de frango empanado, crocante e saboroso. Acompanha arroz, feijão e salada.',
    image: '/images/menu/frango_milanesa.webp'
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
    image: '/images/menu/porcao_batata_m.webp'
  },
  {
    id: 'porcao-batata-g',
    externalId: 'IMP-PORCAO-BATATA-G',
    anotaProductId: '6ab2d03e985d5f8370628611',
    name: 'Batata Frita G',
    category: 'porcoes',
    price: 29.90,
    description: 'Porção grande e generosa, perfeita para compartilhar com a família ou amigos.',
    image: '/images/menu/porcao_batata_g.webp'
  },
  {
    id: 'porcao-cheddar-bacon-m',
    externalId: 'IMP-PORCAO-CHEDDAR-M',
    anotaProductId: '6ab2d03e985d5f8370628613',
    name: 'Batata Frita com Cheddar e Bacon M',
    category: 'porcoes',
    price: 29.90,
    description: 'Batatas fritas douradas cobertas com queijo cheddar cremoso e cubinhos crocantes de bacon (tamanho M).',
    image: '/images/menu/porcao_cheddar_m.webp'
  },
  {
    id: 'porcao-cheddar-bacon-g',
    externalId: 'IMP-PORCAO-CHEDDAR-G',
    anotaProductId: '6ab2d03e985d5f8370628615',
    name: 'Batata Frita com Cheddar e Bacon G',
    category: 'porcoes',
    price: 39.90,
    description: 'A porção definitiva: super fartura de batatas com muito cheddar derretido e bacon crocante (tamanho G).',
    image: '/images/menu/porcao_cheddar_g.webp'
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
