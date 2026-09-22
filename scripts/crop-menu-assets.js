import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputImagePath = 'C:/Users/agora/.gemini/antigravity/brain/2c4cd40c-ee72-4f65-947f-7a0c14dc2c2d/.user_uploaded/media_1789766398637.jpg';
const outputDir = 'public/images/menu';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Coordinates based on 682x1024 image
const crops = [
  // Brand / Header
  { name: 'logo', left: 32, top: 8, width: 125, height: 105 },
  { name: 'hero_strogonoff', left: 350, top: 0, width: 332, height: 115 },
  
  // Destaques (row at ~y:150)
  { name: 'destaque_parmegiana', left: 19, top: 153, width: 125, height: 88 },
  { name: 'destaque_strogonoff', left: 151, top: 153, width: 125, height: 88 },
  { name: 'destaque_prato_dia', left: 284, top: 153, width: 124, height: 88 },
  { name: 'destaque_batata_cheddar', left: 411, top: 153, width: 124, height: 88 },
  { name: 'destaque_frango_milanesa', left: 540, top: 153, width: 124, height: 88 },

  // Combos (row at ~y:360)
  { name: 'combo_parmegiana', left: 27, top: 362, width: 150, height: 68 },
  { name: 'combo_strogonoff', left: 188, top: 362, width: 150, height: 68 },
  { name: 'combo_prato_dia', left: 350, top: 362, width: 150, height: 68 },
  { name: 'combo_batata_bebida', left: 510, top: 362, width: 150, height: 68 },

  // Pratos de Carne
  { name: 'carne_strogonoff', left: 17, top: 563, width: 92, height: 70 },
  { name: 'carne_bife_cavalo', left: 17, top: 648, width: 92, height: 75 },

  // Pratos de Frango
  { name: 'frango_strogonoff', left: 251, top: 557, width: 78, height: 60 },
  { name: 'frango_parmegiana', left: 251, top: 620, width: 78, height: 55 },
  { name: 'frango_tiras', left: 251, top: 678, width: 78, height: 55 },
  { name: 'frango_milanesa', left: 251, top: 738, width: 78, height: 55 },

  // Porções
  { name: 'porcao_batata_m', left: 593, top: 560, width: 74, height: 52 },
  { name: 'porcao_batata_g', left: 593, top: 620, width: 74, height: 52 },
  { name: 'porcao_cheddar_m', left: 591, top: 683, width: 76, height: 50 },
  { name: 'porcao_cheddar_g', left: 591, top: 742, width: 76, height: 50 },

  // Sobremesas
  { name: 'sobremesa_brownie', left: 370, top: 830, width: 85, height: 42 },
  { name: 'sobremesa_mousse', left: 477, top: 829, width: 55, height: 43 },
  { name: 'sobremesa_pudim', left: 370, top: 893, width: 85, height: 45 },
  { name: 'sobremesa_banoffee', left: 477, top: 887, width: 62, height: 51 },
  { name: 'sobremesa_promo_combo', left: 574, top: 893, width: 92, height: 65 },

  // Bebidas
  { name: 'bebida_agua', left: 21, top: 829, width: 32, height: 44 },
  { name: 'bebida_coca_lata', left: 190, top: 829, width: 30, height: 44 },
  { name: 'bebida_coca_zero_lata', left: 272, top: 829, width: 30, height: 44 },
  { name: 'bebida_guarana', left: 21, top: 860, width: 32, height: 44 },
  { name: 'bebida_coca_2l', left: 107, top: 860, width: 30, height: 44 },
  { name: 'bebida_fanta_2l', left: 190, top: 860, width: 30, height: 44 },
  { name: 'bebida_kuat_2l', left: 272, top: 860, width: 30, height: 44 },
  { name: 'bebida_delvalle', left: 21, top: 910, width: 32, height: 44 },
  { name: 'bebida_delvalle_maracuja', left: 107, top: 910, width: 30, height: 44 },
  { name: 'bebida_delvalle_1l', left: 190, top: 910, width: 30, height: 44 },
];

async function run() {
  for (const crop of crops) {
    try {
      await sharp(inputImagePath)
        .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
        .resize({ width: crop.width * 2 }) // scale 2x for retina sharpness
        .webp({ quality: 90 })
        .toFile(path.join(outputDir, `${crop.name}.webp`));
      console.log(`Cropped: ${crop.name}`);
    } catch (err) {
      console.error(`Error cropping ${crop.name}:`, err.message);
    }
  }
}

run();
