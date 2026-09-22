import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputImagePath = 'C:/Users/agora/.gemini/antigravity/brain/2c4cd40c-ee72-4f65-947f-7a0c14dc2c2d/.user_uploaded/media_1789766398637.jpg';

async function inspect() {
  const metadata = await sharp(inputImagePath).metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height);
}

inspect();
