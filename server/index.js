import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { AnotaAIAdapter } from './adapters/anotaAdapter.js';
import { GoogleMapsAdapter } from './adapters/googleMapsAdapter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração de Middlewares
app.use(cors());
app.use(express.json());

// Instanciação dos Adapters de Integração
const anotaAdapter = new AnotaAIAdapter();
const mapsAdapter = new GoogleMapsAdapter();

// Cache em memória simples para evitar recalcular o mesmo endereço repetidamente
const distanceCache = new Map();
const DISTANCE_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

// Cache em memória simples para prevenção de pedidos duplicados (idempotência)
const processedOrderKeys = new Map();

/**
 * Limpeza periódica de chaves de idempotência a cada 10 minutos
 */
setInterval(() => {
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
  for (const [key, timestamp] of processedOrderKeys.entries()) {
    if (timestamp < tenMinutesAgo) {
      processedOrderKeys.delete(key);
    }
  }
}, 10 * 60 * 1000);

/**
 * Healthcheck & Status da Integração
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    restaurant: 'Império do Strogonofe',
    integration: {
      provider: 'Anota AI',
      environment: anotaAdapter.environment,
      isConfigured: anotaAdapter.isConfigured
    },
    distance: {
      provider: 'Google Maps Distance Matrix',
      isConfigured: mapsAdapter.isConfigured
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * Cálculo de Distância/Tempo de Entrega (Google Maps)
 */
app.get('/api/distance', async (req, res) => {
  const address = typeof req.query.address === 'string' ? req.query.address.trim() : '';

  if (!address) {
    return res.status(400).json({ success: false, reason: 'missing_address' });
  }

  const cacheKey = address.toLowerCase();
  const cached = distanceCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < DISTANCE_CACHE_TTL_MS) {
    return res.json(cached.result);
  }

  const result = await mapsAdapter.calculateDistance(address);

  if (result.success) {
    distanceCache.set(cacheKey, { result, timestamp: Date.now() });
  }

  res.json(result);
});

/**
 * Envio de Pedido (Checkout)
 */
app.post('/api/orders', async (req, res) => {
  try {
    const {
      idempotencyKey,
      customer,
      items,
      orderType,
      address,
      paymentMethod,
      notes,
      subtotal,
      deliveryFee = 0,
      total
    } = req.body;

    // 1. Prevenção de duplicidade por duplo clique
    if (idempotencyKey) {
      if (processedOrderKeys.has(idempotencyKey)) {
        console.warn(`[API] Pedido duplicado ignorado (Chave: ${idempotencyKey})`);
        return res.status(409).json({
          success: false,
          userMessage: 'Este pedido já foi enviado anteriormente. Por favor, aguarde a confirmação da cozinha.'
        });
      }
      processedOrderKeys.set(idempotencyKey, Date.now());
    }

    // 2. Validações de Negócio
    if (!customer || !customer.name || customer.name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        userMessage: 'Por favor, informe seu nome completo para o pedido.'
      });
    }

    if (!customer.phone || customer.phone.replace(/\D/g, '').length < 8) {
      return res.status(400).json({
        success: false,
        userMessage: 'Por favor, informe um telefone/WhatsApp válido para contato.'
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        userMessage: 'Seu carrinho está vazio. Adicione pelo menos um item.'
      });
    }

    if (orderType === 'delivery') {
      if (!address || !address.street || !address.number) {
        return res.status(400).json({
          success: false,
          userMessage: 'Por favor, informe a rua e o número para a entrega.'
        });
      }
    }

    // 3. Geração do Protocolo Oficial do Restaurante
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const orderId = `IMP-${orderNumber}`;

    const orderPayload = {
      orderId,
      customer,
      items,
      orderType: orderType || 'delivery',
      address: address || {},
      paymentMethod: paymentMethod || 'PIX na Entrega',
      notes: notes || '',
      subtotal: Number(subtotal) || 0,
      deliveryFee: Number(deliveryFee) || 0,
      total: Number(total) || (Number(subtotal) + Number(deliveryFee))
    };

    // 4. Submissão ao Anota AI através do Adapter
    const result = await anotaAdapter.submitOrder(orderPayload);

    if (!result.success) {
      return res.status(502).json({
        success: false,
        orderId,
        userMessage: result.userMessage,
        canRetry: result.retryable
      });
    }

    return res.status(201).json({
      success: true,
      orderId,
      anotaOrderId: result.anotaOrderId,
      status: result.status,
      estimatedMinutes: result.estimatedMinutes,
      message: result.message,
      restaurant: 'Império do Strogonofe'
    });

  } catch (err) {
    console.error('[API] Erro não tratado ao processar pedido:', err);
    res.status(500).json({
      success: false,
      userMessage: 'Ocorreu uma instabilidade momentânea no servidor. Por favor, tente novamente ou entre em contato pelo nosso WhatsApp oficial.'
    });
  }
});

// Em produção, serve os arquivos estáticos da pasta dist
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback para SPA em rotas não-API
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

app.listen(PORT, () => {
  console.log(`\n👑 [Império do Strogonofe API] Servidor ativo em http://localhost:${PORT}`);
  console.log(`⚙️  [Integração] Motor Anota AI em modo: ${anotaAdapter.environment.toUpperCase()}`);
});
