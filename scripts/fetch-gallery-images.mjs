// One-time script: fetch the gallery photos currently hotlinked from ibb.co,
// resize them, and save locally into src/assets/gallery/ so the site no
// longer depends on a third-party image host. Run with:
//   node scripts/fetch-gallery-images.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "src", "assets", "gallery");

const PHOTOS = [
  { url: "https://i.ibb.co/Z6QyqM1/DSC0320-hires.jpg", filename: "DSC0320-hires.jpg" },
  { url: "https://i.ibb.co/cXvkGFg/DSC0319-hires.jpg", filename: "DSC0319-hires.jpg" },
  { url: "https://i.ibb.co/n3TmSV6/DSC0252-hires.jpg", filename: "DSC0252-hires.jpg" },
  { url: "https://i.ibb.co/cF9GKGy/DSC0328-hires.jpg", filename: "DSC0328-hires.jpg" },
  { url: "https://i.ibb.co/RyyQcJq/DSC0243-hires.jpg", filename: "DSC0243-hires.jpg" },
  { url: "https://i.ibb.co/5snBTSZ/DSC0260-hires.jpg", filename: "DSC0260-hires.jpg" },
  { url: "https://i.ibb.co/Ln6nBX2/DSC0300-hires.jpg", filename: "DSC0300-hires.jpg" },
  { url: "https://i.ibb.co/HXkDGzd/DSC0265-hires.jpg", filename: "DSC0265-hires.jpg" },
  { url: "https://i.ibb.co/kQJkCmZ/DSC0347-hires.jpg", filename: "DSC0347-hires.jpg" },
  { url: "https://i.ibb.co/NYdzhQ7/DSC0349-hires.jpg", filename: "DSC0349-hires.jpg" },
  { url: "https://i.ibb.co/vwgKMSX/DSC0354-hires.jpg", filename: "DSC0354-hires.jpg" },
  { url: "https://i.ibb.co/tzHBB1j/DSC0359-hires.jpg", filename: "DSC0359-hires.jpg" },
  { url: "https://i.ibb.co/7v2bzKc/DSC0364-hires.jpg", filename: "DSC0364-hires.jpg" },
  {
    url: "https://i.ibb.co/GMD1f9D/Whats-App-Image-2023-07-25-at-10-39-08-2.jpg",
    filename: "WhatsApp-Image-2023-07-25-at-10-39-08-2.jpg",
  },
  { url: "https://i.ibb.co/0cS9znt/20230716-163139222-i-OS.jpg", filename: "20230716-163139222-iOS.jpg" },
  { url: "https://i.ibb.co/wSG6HYR/20230716-163145791-i-OS.jpg", filename: "20230716-163145791-iOS.jpg" },
  { url: "https://i.ibb.co/K6VVy8C/20230716-164149852-i-OS.jpg", filename: "20230716-164149852-iOS.jpg" },
  { url: "https://i.ibb.co/MNyd6Tn/20230716-164239009-i-OS.jpg", filename: "20230716-164239009-iOS.jpg" },
  { url: "https://i.ibb.co/Jq5zq1R/AI-Dome-4.jpg", filename: "AI-Dome-4.jpg" },
  { url: "https://i.ibb.co/ZmdvP20/AI-Dome1.jpg", filename: "AI-Dome1.jpg" },
  { url: "https://i.ibb.co/Dz1TcJR/AI-Dome2.jpg", filename: "AI-Dome2.jpg" },
  { url: "https://i.ibb.co/vkqgqGX/AI-Dome3.jpg", filename: "AI-Dome3.jpg" },
  { url: "https://i.ibb.co/RbqZ8Kv/AI-Dome5.jpg", filename: "AI-Dome5.jpg" },
  { url: "https://i.ibb.co/QH0n5qZ/AI-Dome6.jpg", filename: "AI-Dome6.jpg" },
  { url: "https://i.ibb.co/BC6s28h/AI-Dome7.jpg", filename: "AI-Dome7.jpg" },
  { url: "https://i.ibb.co/Lh1V8ZX/AI-Dome8.jpg", filename: "AI-Dome8.jpg" },
];

async function fetchAndResize({ url, filename }) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  const outPath = join(OUT_DIR, filename);
  await sharp(buffer)
    .rotate() // respect EXIF orientation
    .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  const { width, height } = await sharp(outPath).metadata();
  console.log(`${filename}: ${width}x${height}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const photo of PHOTOS) {
    await fetchAndResize(photo);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
