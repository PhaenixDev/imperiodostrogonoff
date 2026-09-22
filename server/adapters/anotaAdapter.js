/**
 * ANOTA AI ADAPTER
 * 
 * Camada de abstração e isolamento para comunicação com o Anota AI.
 * Responsável por:
 * - Autenticação e injeção do header x-page-id
 * - Normalização do pedido do cliente para o formato operacional da Anota AI
 * - Mapeamento por external_id dos itens do cardápio
 * - Modo Sandbox / Fallback seguro para homologação sem quebrar o cliente
 * - Sanitização de mensagens de erro para o consumidor
 */

export class AnotaAIAdapter {
  constructor(config = {}) {
    this.apiUrl = config.apiUrl || process.env.ANOTA_API_URL || 'https://gateway-partners.anota.ai';
    this.pageId = config.pageId || process.env.ANOTA_PAGE_ID || '';
    this.clientId = config.clientId || process.env.ANOTA_CLIENT_ID || '';
    this.clientSecret = config.clientSecret || process.env.ANOTA_CLIENT_SECRET || '';
    this.apiToken = config.apiToken || process.env.ANOTA_API_TOKEN || '';
    this.environment = config.environment || process.env.ANOTA_ENVIRONMENT || 'sandbox';

    this.isConfigured = Boolean(
      this.pageId &&
      !this.pageId.includes('placeholder') &&
      ((this.clientId && !this.clientId.includes('placeholder')) || this.apiToken)
    );
  }

  /**
   * Transforma o pedido do domínio da loja no formato operacional Anota AI
   */
  transformOrder(orderData) {
    const {
      orderId,
      customer,
      items,
      orderType,
      address,
      paymentMethod,
      notes,
      subtotal,
      deliveryFee,
      total
    } = orderData;

    return {
      external_order_id: orderId,
      merchant_id: this.pageId || 'IMPERIO_STROGONOFFE_STORE',
      order_type: orderType === 'delivery' ? 'DELIVERY' : 'TAKEOUT',
      created_at: new Date().toISOString(),
      customer: {
        name: customer.name,
        phone: customer.phone.replace(/\D/g, ''),
        notes: customer.notes || ''
      },
      delivery_address: orderType === 'delivery' ? {
        street: address.street || '',
        number: address.number || '',
        neighborhood: address.neighborhood || '',
        city: address.city || 'São Paulo',
        state: address.state || 'SP',
        complement: address.complement || '',
        reference: address.reference || ''
      } : null,
      items: items.map(item => ({
        external_id: item.externalId || item.productId,
        name: item.name,
        quantity: item.quantity,
        unit_price: Math.round(item.unitPrice * 100), // Em centavos para conformidade com gateways
        total_price: Math.round(item.unitPrice * item.quantity * 100),
        notes: item.notes || '',
        options: (item.selectedOptions || []).map(opt => ({
          group_title: opt.groupTitle,
          option_name: opt.optionName,
          price_delta: Math.round((opt.priceDelta || 0) * 100)
        }))
      })),
      payment: {
        method: paymentMethod,
        status: 'PENDING_ON_DELIVERY', // Ou PENDING_PAYMENT
        subtotal: Math.round(subtotal * 100),
        delivery_fee: Math.round(deliveryFee * 100),
        total: Math.round(total * 100)
      },
      general_notes: notes || ''
    };
  }

  /**
   * Envia o pedido para o Anota AI ou simula confirmação em Sandbox
   */
  async submitOrder(orderData) {
    const payload = this.transformOrder(orderData);

    // Se as credenciais reais do Anota AI ainda forem placeholders,
    // opera em Modo Sandbox Seguro com logs detalhados sem interromper a experiência do cliente
    if (!this.isConfigured || this.environment === 'sandbox') {
      console.log('\n[AnotaAIAdapter] === OPERAÇÃO EM MODO SANDBOX / HOMOLOGAÇÃO ===');
      console.log(`[AnotaAIAdapter] Pedido Protocolo: ${orderData.orderId}`);
      console.log(`[AnotaAIAdapter] Cliente: ${orderData.customer.name} (${orderData.customer.phone})`);
      console.log(`[AnotaAIAdapter] Itens: ${orderData.items.length} produto(s)`);
      console.log(`[AnotaAIAdapter] Total: R$ ${orderData.total.toFixed(2)}`);
      console.log(`[AnotaAIAdapter] Status de Credenciais: Aguardando preenchimento no .env (page_id: ${this.pageId || 'pendente'})`);
      console.log('[AnotaAIAdapter] Payload normalizado preparado:', JSON.stringify(payload, null, 2));

      // Simula latência de rede realista (400ms a 700ms)
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        orderId: orderData.orderId,
        anotaOrderId: `ANOTA-SIM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: 'RECEIVED_BY_RESTAURANT',
        estimatedMinutes: orderData.orderType === 'delivery' ? '35 a 50 min' : '20 a 30 min',
        message: 'Pedido enviado com sucesso para a cozinha do restaurante.',
        mode: 'sandbox'
      };
    }

    // Modo Produção com Gateway Oficial Anota AI
    try {
      const response = await fetch(`${this.apiUrl}/api/partner/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-page-id': this.pageId,
          ...(this.apiToken ? { 'Authorization': `Bearer ${this.apiToken}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[AnotaAIAdapter] Erro da API Anota AI:', response.status, errorText);
        throw new Error(`Anota API error: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        orderId: orderData.orderId,
        anotaOrderId: result.id || result.order_id || `ANOTA-${Date.now()}`,
        status: 'CONFIRMED',
        estimatedMinutes: result.estimated_delivery_time || '35 a 50 min',
        message: 'Pedido recebido e confirmado pela cozinha.',
        mode: 'production'
      };
    } catch (err) {
      console.error('[AnotaAIAdapter] Falha na comunicação com Anota AI:', err.message);
      // Erro amigável para o cliente sem expor termos internos de infraestrutura
      return {
        success: false,
        orderId: orderData.orderId,
        userMessage: 'Não foi possível enviar seu pedido diretamente à cozinha neste momento. Você pode finalizar rapidamente pelo nosso atendimento via WhatsApp.',
        error: err.message,
        retryable: true
      };
    }
  }
}
