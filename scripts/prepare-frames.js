import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'images');
const destDir = path.join(__dirname, '..', 'public', 'frames', 'porsche');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log('Scanning source directory:', srcDir);
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('ezgif-frame-') && f.endsWith('.jpg'));
files.sort((a, b) => {
  const numA = parseInt(a.replace('ezgif-frame-', '').replace('.jpg', ''), 10);
  const numB = parseInt(b.replace('ezgif-frame-', '').replace('.jpg', ''), 10);
  return numA - numB;
});

console.log(`Found ${files.length} frames.`);

files.forEach((file, index) => {
  const frameNum = String(index + 1).padStart(3, '0');
  const targetName = `frame_${frameNum}.jpg`;
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, targetName);
  fs.copyFileSync(srcPath, destPath);
});

const manifest = {
  count: files.length,
  pattern: "frames/porsche/frame_%03d.jpg"
};

fs.writeFileSync(path.join(destDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Successfully prepared ${files.length} frames in ${destDir} and wrote manifest.json!`);
