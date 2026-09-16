import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = "assets/branding/printly-favicon-source.png";

async function pngAtSize(size) {
  return sharp(source).resize(size, size).png().toBuffer();
}

await writeFile("public/favicon.png", await pngAtSize(512));
await writeFile("public/apple-touch-icon.png", await pngAtSize(180));

// An ICO directory can contain PNG payloads, preserving smooth small-size edges.
const sizes = [16, 32, 48, 256];
const images = await Promise.all(sizes.map(pngAtSize));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;

for (let i = 0; i < sizes.length; i += 1) {
  const entry = 6 + 16 * i;
  header[entry] = sizes[i] === 256 ? 0 : sizes[i];
  header[entry + 1] = sizes[i] === 256 ? 0 : sizes[i];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
}

await writeFile("public/favicon.ico", Buffer.concat([header, ...images]));
console.log("Exported favicon.png (512px), favicon.ico (16/32/48/256px), and apple-touch-icon.png (180px).");
