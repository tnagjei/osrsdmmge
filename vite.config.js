// input: src/generated/**/*.html (produced by scripts/build-pages.mjs)
// output: public/ static site build
// pos: vite.config.js (update rule: routes/pages change -> update rollup input + scripts/build-pages.mjs alias logic)
import { defineConfig } from "vite";
import { resolve } from "node:path";
import fg from "fast-glob";

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
    index: resolve(generatedRoot, `index.html`),
    about: resolve(generatedRoot, `about/index.html`),
    blog: resolve(generatedRoot, `blog/index.html`),
    help: resolve(generatedRoot, `help/index.html`),
    privacy: resolve(generatedRoot, `privacy/index.html`),
    terms: resolve(generatedRoot, `terms/index.html`)
  }
);

// Include canonical English blog posts under /blog/<slug>/.
// The files are created by scripts/build-pages.mjs (copied from /en/blog/<slug>/).
for (const relPath of fg.sync("blog/*/index.html", { cwd: generatedRoot })) {
  const parts = relPath.split("/");
  const slug = parts.length >= 3 ? parts[1] : relPath.replaceAll("/", "-");
  input[`blog-${slug}`] = resolve(generatedRoot, relPath);
}

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
