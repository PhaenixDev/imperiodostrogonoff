import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outputDir = 'public/images/menu';

// Fotos reais extraídas do cardápio público do Anota AI (pedido.anota.ai/loja/imprio-do-strogonoff-1),
// via o estado interno (Pinia store) da própria página do Anota — sufixo "_600" pega a maior
// resolução disponível no CDN deles (600x600, confirmado via probing de outras variações).
const items = [
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607151758_X9S1_blob_600',
    files: ['destaque_prato_dia.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202606252145_3B14_blob_600',
    files: ['destaque_strogonoff.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607151735_TG85_blob_600',
    files: ['destaque_frango_milanesa.webp', 'frango_milanesa.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607162223_2U6V_blob_600',
    files: ['destaque_parmegiana.webp', 'frango_parmegiana.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607151610_G8F8_blob_600',
    files: ['frango_tiras.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607161820_0333_blob_600',
    files: ['frango_strogonoff.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607151744_O43X_blob_600',
    files: ['carne_bife_cavalo.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607151557_047P_blob_600',
    files: ['carne_strogonoff.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607162309_BA0P_blob_600',
    files: ['porcao_batata_g.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607162308_TI1R_blob_600',
    files: ['porcao_batata_m.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607162301_SB9P_blob_600',
    files: ['destaque_batata_cheddar.webp', 'porcao_cheddar_m.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202607162304_Q6KK_blob_600',
    files: ['porcao_cheddar_g.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202210200025_05ochog4k0ghblob_600',
    files: ['bebida_agua.webp'] // Água COM gás
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202210202131_3jsfvahzku6blob_600',
    files: ['bebida_agua_sem_gas.webp'] // Água SEM gás (arquivo novo, antes compartilhava imagem com a de cima)
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202511281459_w83345k9okdblob_600',
    files: ['bebida_coca_lata.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202511281150_jjmiy3l5iwnblob_600',
    files: ['bebida_coca_zero_lata.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202605011855_t1v6l7l0tzbblob_600',
    files: ['bebida_coca_2l.webp'] // Coca-Cola 2L tradicional
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202511281157_6lcj4rntqyvblob_600',
    files: ['bebida_coca_zero_2l.webp'] // Coca-Cola Zero 2L (arquivo novo, antes compartilhava imagem)
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202210182323_lsf1hzj3mxblob_600',
    files: ['bebida_fanta_2l.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202304191903_4gowz1xx6oblob_600',
    files: ['bebida_kuat_2l.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202511291033_u07cphtmqzblob_600',
    files: ['bebida_delvalle.webp'] // Del Valle Laranja 290ml
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202210200050_tkbxgjcxvbbblob_600',
    files: ['bebida_delvalle_maracuja.webp']
  },
  {
    anotaUrl: 'https://client-assets.anota.ai/produtos/6ab2c3f08f928bd88b812b7a/202507301852_tzv1g0hqa7blob_600',
    files: ['bebida_delvalle_1l.webp']
  }
];

async function run() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const item of items) {
    try {
      const response = await fetch(item.anotaUrl);
      if (!response.ok) {
        console.error(`Falha ao baixar (${response.status}): ${item.anotaUrl}`);
        continue;
      }
      const buffer = Buffer.from(await response.arrayBuffer());

      for (const fileName of item.files) {
        await sharp(buffer)
          .resize({ width: 900, height: 900, fit: 'cover' })
          .webp({ quality: 88 })
          .toFile(path.join(outputDir, fileName));
        console.log(`OK: ${fileName}`);
      }
    } catch (err) {
      console.error(`Erro processando ${item.anotaUrl}:`, err.message);
    }
  }
}

run();
