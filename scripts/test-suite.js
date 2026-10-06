import { RESTAURANT_CONFIG } from '../src/config/restaurantConfig.js';
import { MENU_PRODUCTS, CATEGORIES, SHOWCASE_PRODUCTS } from '../src/data/menuData.js';
import { generateWhatsAppMessage, createWhatsAppOrderLink, formatBRL } from '../src/services/whatsappService.js';
import assert from 'assert';

console.log('--- TEST 1: Menu Data Consistency ---');
console.log(`Total Products: ${MENU_PRODUCTS.length}`);
console.log(`Total Categories: ${CATEGORIES.length}`);
console.log(`Showcase Products: ${SHOWCASE_PRODUCTS.length}`);

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
      productId: 'carne-strogonoff',
      name: 'Strogonoff de Carne',
      basePrice: 29.90,
      unitPrice: 35.90, // with Purê de Batata option +6.00
      quantity: 2,
      selectedOptions: [
        { groupTitle: 'Opcionais', optionName: 'Purê de Batata', priceDelta: 6.00 }
      ],
      notes: 'Caprichar na batata palha',
      image: '/images/menu/carne_strogonoff.webp'
    },
    {
      cartItemId: 'item-2',
      productId: 'combo-parmegiana-coca-lata',
      name: 'Combo à Parmegiana + Coca Lata',
      basePrice: 33.90,
      unitPrice: 33.90,
      quantity: 1,
      image: '/images/menu/frango_parmegiana.webp'
    }
  ],
  orderType: 'delivery',
  address: 'Rua das Flores, 123 - Apto 42',
  notes: 'Tocar a campainha',
  paymentMethod: 'pix',
  subtotal: (35.90 * 2) + 33.90 // 71.80 + 33.90 = 105.70
};

const message = generateWhatsAppMessage(sampleOrder);
console.log('Generated WhatsApp Message:\n');
console.log(message);

assert(message.includes('NOVO PEDIDO - IMPÉRIO DO STROGONOFF'), 'Missing title');
assert(message.includes('2x Strogonoff de Carne'), 'Missing item count');
assert(message.includes('105,70'), 'Subtotal calculated incorrectly');
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
