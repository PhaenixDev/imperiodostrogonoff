import { AnotaAIAdapter } from '../server/adapters/anotaAdapter.js';
import assert from 'assert';

console.log('--- TEST 1: Anota AI Adapter Initialization & Transformation ---');
const adapter = new AnotaAIAdapter({
  apiUrl: 'https://gateway-partners.anota.ai',
  pageId: 'test_store_123',
  clientId: 'test_client_id',
  clientSecret: 'test_client_secret',
  environment: 'sandbox'
});

console.log('Adapter environment:', adapter.environment);
assert.strictEqual(adapter.environment, 'sandbox');

const sampleOrder = {
  orderId: 'IMP-987654',
  customer: {
    name: 'Carlos Oliveira',
    phone: '11988887777',
    notes: 'Campainha com defeito'
  },
  items: [
    {
      productId: 'destaque-strogonoff',
      externalId: 'IMP-STROG-CREMOSO',
      name: 'Strogonoff Cremoso',
      unitPrice: 29.90,
      quantity: 2,
      notes: 'Caprichar na batata palha',
      selectedOptions: [
        { groupTitle: 'Proteína', optionName: 'Carne bovina macia', priceDelta: 7.00 }
      ]
    },
    {
      productId: 'combo-parmegiana',
      externalId: 'IMP-COMBO-PARMEGIANA',
      name: 'Combo Parmegiana',
      unitPrice: 39.90,
      quantity: 1,
      selectedOptions: [
        { groupTitle: 'Bebida', optionName: 'Coca-Cola Tradicional 310ml', priceDelta: 0 }
      ]
    }
  ],
  orderType: 'delivery',
  address: {
    street: 'Rua das Oliveiras',
    number: '450',
    neighborhood: 'Bela Vista',
    complement: 'Apto 101',
    city: 'São Paulo',
    state: 'SP'
  },
  paymentMethod: 'PIX na Entrega',
  notes: 'Por favor avisar quando estiver saindo',
  subtotal: 99.70,
  deliveryFee: 5.00,
  total: 104.70
};

// 1. Testa transformação para schema Anota AI
const anotaPayload = adapter.transformOrder(sampleOrder);
console.log('Transformed Payload for Anota AI:');
console.log(JSON.stringify(anotaPayload, null, 2));

assert.strictEqual(anotaPayload.external_order_id, 'IMP-987654');
assert.strictEqual(anotaPayload.order_type, 'DELIVERY');
assert.strictEqual(anotaPayload.customer.name, 'Carlos Oliveira');
assert.strictEqual(anotaPayload.customer.phone, '11988887777');
assert.strictEqual(anotaPayload.items.length, 2);
assert.strictEqual(anotaPayload.items[0].external_id, 'IMP-STROG-CREMOSO');
assert.strictEqual(anotaPayload.items[0].total_price, 5980); // em centavos
assert.strictEqual(anotaPayload.payment.total, 10470); // em centavos

console.log('\n--- TEST 2: Submissão de Pedido em Modo Sandbox ---');
async function runSubmitTest() {
  const result = await adapter.submitOrder(sampleOrder);
  console.log('Submit result:', result);

  assert.strictEqual(result.success, true);
  assert.strictEqual(result.orderId, 'IMP-987654');
  assert(result.anotaOrderId.startsWith('ANOTA-SIM-'));
  assert.strictEqual(result.status, 'RECEIVED_BY_RESTAURANT');
  assert.strictEqual(result.mode, 'sandbox');

  console.log('\n✅ TODOS OS TESTES DO ADAPTER ANOTA AI FORAM CONCLUÍDOS COM SUCESSO!');
}

runSubmitTest();
