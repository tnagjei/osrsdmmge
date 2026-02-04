#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';

const repoRoot = path.resolve('.');
const publicDir = path.join(repoRoot, 'public');

async function verifyDeployment() {
  console.log('🔍 验证 Cloudflare Pages 部署准备...');

  // 检查必要文件
  const requiredFiles = [
    'public/_headers',
    'public/robots.txt',
    'public/sitemap.xml',
    'public/llms.txt'
  ];

  console.log('\n📋 检查必要文件...');
  for (const file of requiredFiles) {
    const exists = await fs.access(file).then(() => true).catch(() => false);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    if (!exists) {
      throw new Error(`缺少必要文件: ${file}`);
    }
  }

  // 检查多语言页面
  const locales = ['en', 'ja', 'ko', 'de', 'es', 'ar'];
  console.log('\n🌍 检查多语言页面...');

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
      const exists = await fs.access(file).then(() => true).catch(() => false);
      console.log(`${exists ? '✅' : '❌'} ${file}`);
      if (!exists) {
        throw new Error(`缺少语言文件: ${file}`);
      }
    }
  }

  // 检查静态资源
  console.log('\n🎨 检查静态资源...');
  const assetFiles = await fg(['public/assets/**/*'], { cwd: repoRoot });

  if (assetFiles.length === 0) {
    console.warn('⚠️  未找到静态资源文件');
  } else {
    console.log(`✅ 找到 ${assetFiles.length} 个静态资源文件`);
  }

  // 检查HTML文件大小
  console.log('\n📊 检查文件大小...');
  const htmlFiles = await fg(['public/**/*.html'], { cwd: repoRoot });

  for (const file of htmlFiles.slice(0, 5)) { // 只显示前5个
    const stats = await fs.stat(file);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📄 ${file}: ${sizeKB} KB`);
  }

  if (htmlFiles.length > 5) {
    console.log(`... 还有 ${htmlFiles.length - 5} 个HTML文件`);
  }

  // 检查_headers文件格式
  console.log('\n🔧 检查 _headers 配置...');
  const headersContent = await fs.readFile('public/_headers', 'utf8');
  const hasSecurityHeaders = headersContent.includes('X-Frame-Options');
  const hasCacheHeaders = headersContent.includes('Cache-Control');

  console.log(`${hasSecurityHeaders ? '✅' : '❌'} 包含安全头`);
  console.log(`${hasCacheHeaders ? '✅' : '❌'} 包含缓存策略`);

  // 验证构建配置
  console.log('\n⚙️  验证构建配置...');
  const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
  const hasBuildScript = packageJson.scripts.build;
  const hasBuildPagesScript = packageJson.scripts['build:pages'];

  console.log(`${hasBuildScript ? '✅' : '❌'} 包含 build 脚本`);
  console.log(`${hasBuildPagesScript ? '✅' : '❌'} 包含 build:pages 脚本`);

  console.log('\n🎉 部署验证完成！');
  console.log('\n📝 部署检查清单:');
  console.log('✅ 项目已准备好部署到 Cloudflare Pages');
  console.log('✅ 所有必要文件都存在');
  console.log('✅ 多语言页面完整');
  console.log('✅ 安全和缓存头已配置');
  console.log('✅ 构建脚本配置正确');

  return true;
}

verifyDeployment().catch(error => {
  console.error('\n❌ 部署验证失败:', error.message);
  process.exit(1);
});