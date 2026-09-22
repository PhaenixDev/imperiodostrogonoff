import { RESTAURANT_CONFIG } from '../src/config/restaurantConfig.js';
import { MENU_PRODUCTS, CATEGORIES, PRODUCTS_360 } from '../src/data/menuData.js';
import { generateWhatsAppMessage, createWhatsAppOrderLink, formatBRL } from '../src/services/whatsappService.js';
import assert from 'assert';

console.log('--- TEST 1: Menu Data Consistency ---');
console.log(`Total Products: ${MENU_PRODUCTS.length}`);
console.log(`Total Categories: ${CATEGORIES.length}`);
console.log(`360 Products: ${PRODUCTS_360.length}`);

// Ensure all menu categories have items
for (const cat of CATEGORIES) {
  const count = MENU_PRODUCTS.filter(p => p.category === cat.id).length;
  console.log(`  - ${cat.label}: ${count} itens`);
  assert(count > 0, `Category ${cat.id} has no products`);
}

console.log('\n--- TEST 2: Price and Calculation ---');
const sampleOrder = {
  items: [
    {
      cartItemId: 'item-1',
      productId: 'destaque-strogonoff',
      name: 'Strogonoff Cremoso',
      basePrice: 22.90,
      unitPrice: 29.90, // with meat option +7.00
      quantity: 2,
      selectedOptions: [
        { groupTitle: 'Proteína', optionName: 'Carne bovina macia', priceDelta: 7.00 }
      ],
      notes: 'Caprichar na batata palha',
      image: '/images/menu/destaque_strogonoff.webp'
    },
    {
      cartItemId: 'item-2',
      productId: 'combo-parmegiana',
      name: 'Combo Parmegiana',
      basePrice: 39.90,
      unitPrice: 39.90,
      quantity: 1,
      selectedOptions: [
        { groupTitle: 'Bebida', optionName: 'Coca-Cola Tradicional', priceDelta: 0 }
      ],
      image: '/images/menu/combo_parmegiana.webp'
    }
  ],
  orderType: 'delivery',
  address: 'Rua das Flores, 123 - Apto 42',
  notes: 'Tocar a campainha',
  paymentMethod: 'PIX (Chave na confirmação)',
  subtotal: (29.90 * 2) + 39.90 // 59.80 + 39.90 = 99.70
};

const message = generateWhatsAppMessage(sampleOrder);
console.log('Generated WhatsApp Message:\n');
console.log(message);

assert(message.includes('NOVO PEDIDO — IMPÉRIO DO STROGONOFF'), 'Missing title');
assert(message.includes('2x Strogonoff Cremoso'), 'Missing item count');
assert(message.includes('99,70'), 'Subtotal calculated incorrectly');
assert(message.includes('Rua das Flores, 123 - Apto 42'), 'Missing address');

const link = createWhatsAppOrderLink(sampleOrder);
console.log('\nGenerated WhatsApp Link:');
console.log(link.substring(0, 100) + '...');
assert(link.startsWith('https://wa.me/'), 'Invalid WhatsApp URL format');

console.log('\n--- TEST 3: Business Data Safety ---');
console.log('WhatsApp Number configured:', RESTAURANT_CONFIG.whatsappNumber);
assert(/^\d{12,13}$/.test(RESTAURANT_CONFIG.whatsappNumber), 'whatsappNumber must be digits only, international format (55 + DDD + number)');
assert(Array.isArray(RESTAURANT_CONFIG.testimonials), 'Testimonials array is present');
assert(RESTAURANT_CONFIG.testimonials.length === 0, 'No fabricated testimonials are present');

console.log('\n✅ ALL AUTOMATED CHECKS PASSED SUCCESSFULLY!');
