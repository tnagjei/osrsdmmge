import { defineConfig } from "vite";
import { resolve } from "node:path";

const locales = ["en", "fi", "sv", "no"];
const generatedRoot = resolve(__dirname, "src/generated");
const publicRoot = resolve(__dirname, "public");

const input = locales.reduce(
  (entries, locale) => {
    entries[locale] = resolve(generatedRoot, `${locale}/index.html`);
    entries[`${locale}-blog`] = resolve(generatedRoot, `${locale}/blog/index.html`);
    entries[`${locale}-help`] = resolve(generatedRoot, `${locale}/help/index.html`);
    entries[`${locale}-about`] = resolve(generatedRoot, `${locale}/about/index.html`);
    entries[`${locale}-privacy`] = resolve(generatedRoot, `${locale}/privacy/index.html`);
    entries[`${locale}-terms`] = resolve(generatedRoot, `${locale}/terms/index.html`);
    return entries;
  },
  {
    index: resolve(generatedRoot, `index.html`)
  }
);

export default defineConfig({
  root: generatedRoot,
  publicDir: publicRoot,
  server: {
    port: 5173,
    open: "/en/index.html"
  },
  build: {
    outDir: publicRoot,
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        assetFileNames: "assets/[name].[ext]"
      }
    }
  }
});
