// Run from your site folder (the one that contains index.html and the images folder):
//   npm i sharp
//   node optimize-images.mjs
// It creates small WebP versions (hero.webp, p1-1.webp ...). Your originals are NOT touched.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'images';
const jobs = [
  // [original file name, new name, max width in px]
  ['Unconfirmed 280043.crdownload', 'hero', 2000],
  ['Serene Beige Living Room Retreat.png', 'p1-1', 1400],
  ['caroline-badran-aDtv0uDomA0-unsplash.jpg', 'p1-2', 900],
  ['id-interiors-VWt1BBQwwtU-unsplash.jpg', 'p2-1', 1400],
  ['Modern Living Room with Leather Sofa.png', 'p2-2', 900],
  ['sheela-sahani-h3wpq7IeMro-unsplash.jpg', 'p3-1', 1400],
  ['md-mahdi-9Gsw4Y37a2c-unsplash.jpg', 'p3-2', 900],
  ['medea-dzagnidze-zJHwsEli8E8-unsplash.jpg', 'p4-1', 1400],
  ['home-makers-interior-uPI1dohCEsA-unsplash.jpg', 'p4-2', 900],
  ['ikshana-productions-i5UA8CfAD34-unsplash.jpg', 'studio', 1000],
];
const kb = (n) => (n / 1024).toFixed(0) + ' KB';

for (const [file, name, width] of jobs) {
  const src = path.join(dir, file);
  const out = path.join(dir, name + '.webp');
  if (!fs.existsSync(src)) { console.log(`SKIP  ${file}  (file not found)`); continue; }
  try {
    await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(out);
    console.log(`OK    ${name}.webp   ${kb(fs.statSync(src).size)} -> ${kb(fs.statSync(out).size)}`);
  } catch (e) {
    console.log(`FAIL  ${file}  (${e.message.split('\n')[0]}). Re-download this image.`);
  }
}