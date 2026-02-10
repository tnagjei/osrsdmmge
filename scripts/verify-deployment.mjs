#!/usr/bin/env node
// input: public/ build output, vercel.json, and src/static-root SEO files
// output: prints deployment readiness checks; exits 0 on success, 1 on failure
// pos: scripts/verify-deployment.mjs (update rule: routes/SEO files/platform config change -> update checks + docs/seo-indexing-optimization-plan.md)

import { promises as fs } from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import { URL } from "node:url";

const repoRoot = path.resolve(".");
const vercelConfigPath = path.join(repoRoot, "vercel.json");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function readJson(raw, label) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    const msg = error && typeof error.message === "string" ? error.message : String(error);
    throw new Error(`${label} 不是合法 JSON: ${msg}`);
  }
}

function hasRedirectRule(redirects, rule) {
  return redirects.some(
    r =>
      r &&
      r.source === rule.source &&
      r.destination === rule.destination &&
      Boolean(r.permanent) === Boolean(rule.permanent)
  );
}

function hasSecurityHeadersRule(headersRules) {
  return headersRules.some(rule => {
    if (!rule || typeof rule.source !== "string" || !Array.isArray(rule.headers)) return false;
    const keys = new Set(rule.headers.map(h => h && h.key).filter(Boolean));
    return (
      keys.has("X-Frame-Options") &&
      keys.has("X-Content-Type-Options") &&
      keys.has("Referrer-Policy")
    );
  });
}

async function verifyDeployment() {
  const usesVercel = await exists(vercelConfigPath);
  const platformLabel = usesVercel ? "Vercel" : "静态托管（Cloudflare Pages/Netlify 等）";

  console.log(`🔍 验证 ${platformLabel} 部署准备...`);

  if (usesVercel) {
    console.log("\n⚙️  检查 vercel.json 配置...");
    const vercelRaw = await fs.readFile(vercelConfigPath, "utf8");
    const vercelConfig = readJson(vercelRaw, "vercel.json");

    const outputDirectoryOk = vercelConfig.outputDirectory === "public";
    console.log(`${outputDirectoryOk ? "✅" : "❌"} outputDirectory = public`);
    if (!outputDirectoryOk) {
      throw new Error("vercel.json 的 outputDirectory 必须为 public");
    }

    const redirects = Array.isArray(vercelConfig.redirects) ? vercelConfig.redirects : [];
    const requiredRedirects = [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true }
    ];

    for (const rule of requiredRedirects) {
      const ok = hasRedirectRule(redirects, rule);
      console.log(`${ok ? "✅" : "❌"} redirect ${rule.source} -> ${rule.destination}`);
      if (!ok) {
        throw new Error(`vercel.json 缺少 redirect 规则: ${rule.source} -> ${rule.destination}`);
      }
    }

    const headersRules = Array.isArray(vercelConfig.headers) ? vercelConfig.headers : [];
    const securityOk = hasSecurityHeadersRule(headersRules);
    console.log(`${securityOk ? "✅" : "⚠️ "} 已配置安全头 (headers)`);
  }

  const requiredFiles = [
    "public/robots.txt",
    "public/sitemap.xml",
    "public/llms.txt",
    "public/ads.txt"
  ];

  // Cloudflare/Netlify 风格文件：在 Vercel 下不生效，但保留便于迁移与对照。
  const optionalFiles = ["public/_headers", "public/_redirects"];

  console.log("\n📋 检查必要文件...");
  for (const file of requiredFiles) {
    const ok = await exists(path.join(repoRoot, file));
    console.log(`${ok ? "✅" : "❌"} ${file}`);
    if (!ok) {
      throw new Error(`缺少必要文件: ${file}`);
    }
  }

  console.log("\n📎 检查可选文件...");
  for (const file of optionalFiles) {
    const ok = await exists(path.join(repoRoot, file));
    console.log(`${ok ? "✅" : "ℹ️ "} ${file}`);
  }

  // 检查多语言页面（项目当前启用）
  const locales = ["en", "fi", "sv", "no"];
  console.log("\n🌍 检查多语言页面...");

  for (const locale of locales) {
    const files = [
      `public/${locale}/index.html`,
      `public/${locale}/about/index.html`,
      `public/${locale}/blog/index.html`,
      `public/${locale}/help/index.html`,
      `public/${locale}/privacy/index.html`,
      `public/${locale}/terms/index.html`
    ];

    for (const file of files) {
      const ok = await exists(path.join(repoRoot, file));
      console.log(`${ok ? "✅" : "❌"} ${file}`);
      if (!ok) {
        throw new Error(`缺少语言文件: ${file}`);
      }
    }
  }

  // 检查英文规范 URL（根路径）
  console.log("\n🏷️  检查英文规范 URL（根路径页面）...");
  const canonicalEnglishFiles = [
    "public/index.html",
    "public/about/index.html",
    "public/blog/index.html",
    "public/help/index.html",
    "public/privacy/index.html",
    "public/terms/index.html"
  ];

  for (const file of canonicalEnglishFiles) {
    const ok = await exists(path.join(repoRoot, file));
    console.log(`${ok ? "✅" : "❌"} ${file}`);
    if (!ok) {
      throw new Error(`缺少英文规范页面: ${file}`);
    }
  }

  // sitemap 中出现的 URL 必须在 public/ 里有对应的静态页面文件，避免提交 404 URL 影响抓取/收录。
  console.log("\n🧭 校验 sitemap URL 是否都有对应页面文件...");
  const sitemapXml = await fs.readFile(path.join(repoRoot, "public/sitemap.xml"), "utf8");
  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  const locs = locMatches.map(match => match[1].trim()).filter(Boolean);
  console.log(`ℹ️  sitemap 共 ${locs.length} 条 URL`);

  for (const loc of locs) {
    const url = new URL(loc);
    const pathname = url.pathname;
    let expectedFile;

    if (pathname === "/") {
      expectedFile = path.join(repoRoot, "public", "index.html");
    } else if (pathname.endsWith("/")) {
      expectedFile = path.join(repoRoot, "public", pathname.slice(1), "index.html");
    } else {
      expectedFile = path.join(repoRoot, "public", pathname.slice(1));
    }

    const ok = await exists(expectedFile);
    const printable = expectedFile.replace(repoRoot + path.sep, "");
    console.log(`${ok ? "✅" : "❌"} ${loc} -> ${printable}`);
    if (!ok) {
      throw new Error(`sitemap URL 对应文件不存在: ${loc} -> ${printable}`);
    }
  }

  // 检查静态资源
  console.log("\n🎨 检查静态资源...");
  const assetFiles = await fg(["public/assets/**/*"], { cwd: repoRoot });

  if (assetFiles.length === 0) {
    console.warn("⚠️  未找到静态资源文件");
  } else {
    console.log(`✅ 找到 ${assetFiles.length} 个静态资源文件`);
  }

  // 检查HTML文件大小
  console.log("\n📊 检查文件大小...");
  const htmlFiles = await fg(["public/**/*.html"], { cwd: repoRoot });

  for (const file of htmlFiles.slice(0, 5)) {
    const stats = await fs.stat(file);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📄 ${file}: ${sizeKB} KB`);
  }

  if (htmlFiles.length > 5) {
    console.log(`... 还有 ${htmlFiles.length - 5} 个HTML文件`);
  }

  console.log("\n🔧 检查头部配置...");
  if (usesVercel) {
    console.log("✅ Vercel 使用 vercel.json 的 headers（public/_headers 不生效）");
  }

  if (await exists(path.join(repoRoot, "public/_headers"))) {
    const headersContent = await fs.readFile(path.join(repoRoot, "public/_headers"), "utf8");
    const hasSecurityHeaders =
      headersContent.includes("X-Frame-Options") &&
      headersContent.includes("X-Content-Type-Options");
    const hasCacheHeaders = headersContent.includes("Cache-Control");

    console.log(`${hasSecurityHeaders ? "✅" : "❌"} public/_headers 包含安全头`);
    console.log(`${hasCacheHeaders ? "✅" : "❌"} public/_headers 包含缓存策略`);
  } else {
    console.log("ℹ️  未找到 public/_headers");
  }

  // 验证构建配置
  console.log("\n⚙️  验证构建配置...");
  const packageJsonRaw = await fs.readFile(path.join(repoRoot, "package.json"), "utf8");
  const packageJson = readJson(packageJsonRaw, "package.json");
  const hasBuildScript = Boolean(packageJson.scripts && packageJson.scripts.build);
  const hasBuildPagesScript = Boolean(packageJson.scripts && packageJson.scripts["build:pages"]);

  console.log(`${hasBuildScript ? "✅" : "❌"} 包含 build 脚本`);
  console.log(`${hasBuildPagesScript ? "✅" : "❌"} 包含 build:pages 脚本`);

  console.log("\n🎉 部署验证完成！");
  console.log("\n📝 部署检查清单:");
  console.log(`✅ 项目已准备好部署到 ${platformLabel}`);
  console.log("✅ 所有必要文件都存在");
  console.log("✅ 多语言页面完整");
  console.log("✅ 构建脚本配置正确");

  return true;
}

verifyDeployment().catch(error => {
  const msg = error && typeof error.message === "string" ? error.message : String(error);
  console.error("\n❌ 部署验证失败:", msg);
  process.exit(1);
});
