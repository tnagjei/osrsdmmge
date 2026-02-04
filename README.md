# Small Font Online - 多语言静态网站

一个现代化的多语言小型字体在线工具平台，支持6种语言版本，采用Tailwind CSS构建的静态网站。

## 🌟 功能特点

- **多语言支持**：英语、简体中文、日语、韩语、德语、西班牙语、阿拉伯语
- **现代化设计**：基于Tailwind CSS的响应式设计
- **静态站点生成**：使用Nunjucks模板引擎和Vite构建
- **SEO优化**：完整的元数据和结构化数据
- **隐私优先**：客户端处理，无需服务器端数据收集
- **CDN就绪**：优化静态资源缓存和加载性能

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Git

### 本地开发

```bash
# 1. 克隆项目
git clone <repository-url>
cd smallfont

# 2. 安装依赖
npm install --registry=https://registry.npmmirror.com --fetch-timeout=600000 --fetch-retries=2

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
# http://localhost:5173/en/
```

### 构建生产版本

```bash
# 构建项目
npm run build

# 预览生产版本
npm run preview

# 部署验证
npm run verify:deploy
```

## 📁 项目结构

```
smallfont/
├── public/                 # 构建输出目录
│   ├── assets/            # 静态资源（CSS、图片等）
│   ├── _headers          # Cloudflare Pages Headers配置
│   ├── robots.txt        # 搜索引擎爬虫配置
│   ├── sitemap.xml       # 站点地图
│   └── [lang]/           # 多语言页面目录
│       ├── index.html
│       ├── about/
│       ├── blog/
│       ├── help/
│       ├── privacy/
│       └── terms/
├── src/                  # 源代码目录
│   ├── components/       # 公共组件和配置
│   │   ├── header.njk   # 页面头部模板
│   │   ├── footer-*.njk # 页脚模板
│   │   ├── layout-data.js # 多语言布局数据
│   │   └── meta.njk     # 元数据模板
│   ├── pages/           # 页面模板
│   │   └── [lang]/      # 各语言版本页面
│   └── styles/          # 样式文件
│       └── tailwind.css # Tailwind CSS配置
├── scripts/             # 构建脚本
│   ├── build-pages.mjs  # 页面构建脚本
│   └── verify-deployment.mjs # 部署验证脚本
├── docs/               # 项目文档
├── package.json        # 项目配置和依赖
├── vite.config.js      # Vite构建配置
├── tailwind.config.js  # Tailwind CSS配置
└── wrangler.toml       # Cloudflare Pages配置
```

## 🌍 多语言配置

项目支持以下语言版本：

| 语言代码 | 语言名称 | 方向 | 状态 |
|---------|---------|------|------|
| `en` | English | LTR | ✅ 完整 |
| `ja` | 日本語 | LTR | ✅ 完整 |
| `ko` | 한국어 | LTR | ✅ 完整 |
| `de` | Deutsch | LTR | ✅ 完整 |
| `es` | Español | LTR | ✅ 完整 |
| `ar` | العربية | RTL | ✅ 完整 |

### 添加新语言

1. 在 `src/components/layout-data.js` 中添加语言配置
2. 在 `src/pages/` 目录下创建对应的语言文件夹
3. 复制并翻译页面模板
4. 更新语言切换菜单

## ☁️ Cloudflare Pages 部署

### 自动部署（推荐）

1. **连接Git仓库**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 创建新的Pages项目
   - 连接你的Git仓库（GitHub/GitLab）

2. **配置构建设置**
   ```toml
   # wrangler.toml
   name = "smallfont-multilingual"
   compatibility_date = "2024-01-01"

   [build]
   command = "npm run build"
   cwd = "."
   ```

3. **环境变量**（可选）
   ```bash
   NODE_VERSION = "18"
   BUILDTIME = "timestamp"
   DEPLOY_ENV = "production"
   ```

### 手动部署

```bash
# 构建项目
npm run build

# 部署到Cloudflare Pages
npx wrangler pages deploy public --project-name=smallfont-multilingual

# 或者使用Cloudflare Dashboard上传
```

### 自定义域名

参考 [域名配置指南](docs/cloudflare-domains.md) 设置自定义域名。

## 🔧 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产版本 |
| `npm run build:pages` | 构建多语言页面 |
| `npm run tailwind:build` | 构建Tailwind CSS |
| `npm run verify:deploy` | 验证部署准备状态 |
| `npm run deploy:check` | 完整部署前检查 |

## 🧪 测试

### HTML验证
```bash
# 验证单个HTML文件
npx html-validate public/en/index.html

# 验证所有HTML文件
npx html-validate "public/**/*.html"
```

### 多语言测试
- 手动测试所有语言版本的页面
- 验证语言切换功能
- 检查RTL布局（阿拉伯语）
- 确认SEO元数据完整性

## 📊 性能优化

- **静态资源缓存**：通过 `_headers` 文件配置
- **图片优化**：使用现代格式（WebP、AVIF）
- **代码分割**：自动CSS和JS优化
- **CDN加速**：Cloudflare全球网络加速

## 🔒 安全配置

项目已配置以下安全头：
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- 内容安全策略（CSP）

## 🚨 故障排除

遇到问题时，请参考：

- [部署故障排除指南](docs/cloudflare-troubleshooting.md)
- [部署检查清单](docs/deployment-checklist.md)
- [域名配置指南](docs/cloudflare-domains.md)

常见问题快速诊断：
```bash
# 检查构建状态
npm run verify:deploy

# 查看详细错误信息
npm run build 2>&1 | tee build.log
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- 使用ES6+语法
- 遵循语义化HTML
- 采用BEM命名规范的CSS类名
- 保持多语言文件同步更新
- 编写有意义的提交信息

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 优秀的CSS框架
- [Vite](https://vitejs.dev/) - 快速的构建工具
- [Nunjucks](https://mozilla.github.io/nunjucks/) - 灵活的模板引擎
- [Cloudflare Pages](https://pages.cloudflare.com/) - 可靠的托管平台

## 📞 联系方式

- 项目维护者：tangjei414
- 邮箱：tangjei414@gmail.com
- Telegram：[@tangjei](https://t.me/tangjei)

---

**享受你的多语言开发之旅！🚀**

*最后更新：2025年9月28日*