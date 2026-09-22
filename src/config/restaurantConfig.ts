/**
 * Configurações Gerais do Restaurante "Império do Estrogonofe"
 * 
 * NOTA DE SEGURANÇA E DADOS:
 * Conforme diretrizes do projeto, nenhum dado de contato real foi inventado.
 * Os valores abaixo são marcadores de configuração (placeholders) que podem
 * ser facilmente atualizados pelo proprietário do restaurante.
 */

export interface RestaurantConfig {
  name: string;
  tagline: string;
  whatsappNumber: string; // Formato internacional sem '+' e sem traços (ex: 5511999999999)
  displayPhone: string;
  address: {
    street: string;
    neighborhood: string;
    cityState: string;
    reference: string;
  };
  openingHours: {
    days: string;
    hours: string;
    deliveryTime: string;
  };
  social: {
    instagram: string;
    instagramUrl: string;
  };
  maps: {
    embedUrl: string;
    directionsUrl: string;
  };
  features: {
    enableDelivery: boolean;
    enablePickup: boolean;
    minimumOrder: number;
    estimatedDeliveryTime: string;
    defaultDeliveryFeeNote: string;
  };
  testimonials: Array<{
    id: string;
    author: string;
    text: string;
    rating: number;
    date: string;
    verified: boolean;
  }>;
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "Império do Estrogonofe",
  tagline: "Sabor, qualidade e muito mais para o seu dia!",
  
  // NÚMERO DO WHATSAPP:
  // Formato internacional sem '+' e sem traços (55 + DDD + número)
  whatsappNumber: "5534984138325",
  displayPhone: "(34) 98413-8325",

  address: {
    street: "Rua Jerônimo Martins do Nascimento, 224 (CEP 38400-681)",
    neighborhood: "Bairro Bom Jesus",
    cityState: "Uberlândia - MG",
    reference: ""
  },

  openingHours: {
    days: "Terça a Domingo",
    hours: "11:00 às 23:00",
    deliveryTime: "30 a 50 min"
  },

  social: {
    instagram: "@imperiodostrogonofe",
    instagramUrl: "https://instagram.com/imperiodostrogonofe"
  },

  maps: {
    // URL para abertura direta no app de mapas
    directionsUrl: "https://maps.google.com/?q=Rua+Jer%C3%B4nimo+Martins+do+Nascimento%2C+224%2C+Bairro+Bom+Jesus%2C+Uberl%C3%A2ndia+-+MG%2C+38400-681",
    // Embed sem necessidade de chave de API (modo de busca por endereço)
    embedUrl: "https://maps.google.com/maps?q=Rua+Jer%C3%B4nimo+Martins+do+Nascimento%2C+224%2C+Bairro+Bom+Jesus%2C+Uberl%C3%A2ndia+-+MG%2C+38400-681&z=16&output=embed"
  },

  features: {
    enableDelivery: true,
    enablePickup: true,
    minimumOrder: 20.00,
    estimatedDeliveryTime: "35-50 min",
    defaultDeliveryFeeNote: "Taxa de entrega calculada via WhatsApp de acordo com seu bairro."
  },

  // Conforme a regra número 5 ("Do NOT fabricate customer reviews"):
  // O array inicia vazio e o componente só exibe depoimentos reais quando fornecidos.
  testimonials: []
};
