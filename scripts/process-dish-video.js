import ffmpegPath from 'ffmpeg-static';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Vídeo bruto enviado pelo cliente (fora do repositório) — ajuste este caminho
// sempre que for processar um novo vídeo de prato.
const inputPath = 'C:/Users/agora/Downloads/IMG_3459.MOV';
const outputDir = 'public/videos';
const outputName = 'strogonoff-showcase';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const mp4Out = path.join(outputDir, `${outputName}.mp4`);
const posterOut = path.join(outputDir, `${outputName}-poster.jpg`);

// Recorte quadrado centralizado (o vídeo original é 2160x2700, retrato) +
// redimensiona para 720x720 (suficiente para o visualizador circular do site,
// que exibe no máximo ~288px, já contando telas retina).
const cropScale = 'crop=2160:2160:0:270,scale=720:720';

console.log('Convertendo vídeo para MP4 (H.264, sem áudio, otimizado para web)...');
execFileSync(ffmpegPath, [
  '-y',
  '-i', inputPath,
  '-vf', cropScale,
  '-an',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '26',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  mp4Out
], { stdio: 'inherit' });

console.log('Gerando imagem de poster (frame final, prato completo revelado)...');
execFileSync(ffmpegPath, [
  '-y',
  '-ss', '12',
  '-i', inputPath,
  '-vf', cropScale,
  '-vframes', '1',
  '-update', '1',
  posterOut
], { stdio: 'inherit' });

const stat = fs.statSync(mp4Out);
console.log(`\nOK: ${mp4Out} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
console.log(`OK: ${posterOut}`);
