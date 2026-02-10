// input: src/static-root/* (robots.txt, sitemap.xml, llms.txt, etc.)
// output: public/* synced static root files
// pos: scripts/sync-static-root.mjs (update rule: if static root files list changes, update this file + scripts/verify-deployment.mjs)
import { promises as fs } from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(".");
const sourceDir = path.join(repoRoot, "src", "static-root");
const outputDir = path.join(repoRoot, "public");
const requiredFiles = ["ads.txt", "robots.txt", "sitemap.xml", "llms.txt"];
const optionalFiles = ["_redirects", "_headers"];

async function ensureOutputDir() {
  await fs.mkdir(outputDir, { recursive: true });
}

async function syncFile(filename, optional = false) {
  const src = path.join(sourceDir, filename);
  const dest = path.join(outputDir, filename);
  try {
    await fs.access(src);
    await fs.copyFile(src, dest);
    console.log(`Synced ${filename}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      if (optional) {
        console.warn(`Info: optional file ${filename} not found, skipping.`);
      } else {
        throw new Error(`Error: Required file ${filename} missing in src/static-root/`);
      }
    } else {
      throw new Error(`Failed to sync ${filename}: ${error.message}`);
    }
  }
}

async function syncStaticRoot() {
  await ensureOutputDir();
  for (const file of requiredFiles) {
    await syncFile(file, false);
  }
  for (const file of optionalFiles) {
    await syncFile(file, true);
  }
}

syncStaticRoot().catch(error => {
  console.error(error);
  process.exit(1);
});
