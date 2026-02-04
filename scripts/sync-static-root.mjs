import { promises as fs } from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(".");
const sourceDir = path.join(repoRoot, "src", "static-root");
const outputDir = path.join(repoRoot, "public");
const filesToSync = ["ads.txt", "robots.txt", "sitemap.xml", "llms.txt"];

async function ensureOutputDir() {
  await fs.mkdir(outputDir, { recursive: true });
}

async function syncFile(filename) {
  const src = path.join(sourceDir, filename);
  const dest = path.join(outputDir, filename);
  try {
    await fs.copyFile(src, dest);
    console.log(`Synced ${filename}`);
  } catch (error) {
    throw new Error(`Failed to sync ${filename}: ${error.message}`);
  }
}

async function syncStaticRoot() {
  await ensureOutputDir();
  for (const file of filesToSync) {
    await syncFile(file);
  }
}

syncStaticRoot().catch(error => {
  console.error(error);
  process.exit(1);
});
