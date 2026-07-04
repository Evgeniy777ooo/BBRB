#!/usr/bin/env bun
/**
 * Генерация качественного маскота Бабушкаробот v3.
 * В этот раз — фокус на качестве, акцентная композиция, без обрезки.
 * Запуск: bun /home/z/my-project/scripts/generate-mascot-v3.ts
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'babushka-mascot-v3-raw.png');

async function main() {
  console.log('Initializing ZAI...');
  const zai = await ZAI.create();

  const prompt = [
    // === СУБЪЕКТ — персонаж ===
    'A charming friendly robot grandmother character,',
    'warm and approachable mascot design',
    'cybernetic babushka: gentle polished metal face plates with soft warm brass and copper tones',
    'soft glowing LED eyes shaped like gentle crescents, kind expression, warm smile',
    'wearing a traditional Russian floral head kerchief (платок) with plum, coral and saffron floral pattern',
    'a cozy knitted shawl with subtle geometric pattern draped over metallic shoulders',
    'small reading glasses perched on her nose,',
    'holding a steaming vintage tea cup in one mechanical hand',
    'other hand resting calmly at her side',
    // === КОМПОЗИЦИЯ — критично для устранения обрезки ===
    'full body composition, fully visible from head to bottom, NOT cut off',
    'character centered, with generous empty space around the figure on all sides',
    'bust-up composition with character taking up about 70% of vertical space',
    'figure positioned slightly above center',
    'mascot illustration, vertical character portrait',
    // === СТИЛЬ ===
    'modern flat vector illustration style',
    'clean professional character design',
    'soft gradient shading, dimensional but clean',
    'warm golden hour lighting from upper left',
    'inspired by Pixar character design and modern brand mascots',
    'smooth polished surfaces, friendly proportions, large expressive eyes',
    // === ПАЛИТРА — брендовая ===
    'color palette: deep plum purple (#4a1942) for shadows and outlines,',
    'warm coral (#e85a4f) for accents and lips,',
    'saffron yellow (#f4b942) for glowing elements,',
    'teal green (#2a9d8f) for cybernetic details,',
    'cream beige (#fff8f0) for background',
    // === ФОН ===
    'solid plain cream beige background (#fff8f0), no patterns, no decoration, no scenery',
    'completely empty background, just the character',
    // === ЧТО ИЗБЕГАТЬ ===
    'no text, no watermark, no logo, no signature, no border',
    'no extra objects in background',
    'no cutting off any part of the character',
    // === КАЧЕСТВО ===
    'highly detailed, professional quality, sharp clean vector lines',
    'perfect composition, balanced, polished',
    '4k quality, premium illustration',
  ].join(', ');

  console.log('Generating v3 image...');
  console.log('Prompt length:', prompt.length);

  const response = await zai.images.generations.create({
    prompt,
    size: '1024x1024',
  });

  if (!response.data || !response.data[0] || !response.data[0].base64) {
    throw new Error('Invalid response from image generation API');
  }

  const imageBase64 = response.data[0].base64;
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(OUTPUT_FILE, buffer);

  console.log(`✓ Raw image saved: ${OUTPUT_FILE}`);
  console.log(`  Size: ${buffer.length} bytes`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
