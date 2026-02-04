# Cloudflare Pages 自定义域名配置指南

## 域名要求
- 域名必须已注册并在 Cloudflare DNS 上托管
- 支持顶级域名、二级域名和子域名
- 不支持根域名直接配置（需使用 www 子域名）

## DNS 配置步骤

### 1. 添加域名到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入你的 Pages 项目
3. 点击 "Custom domains" 标签
4. 点击 "Set up a custom domain"
5. 输入你的域名（例如：`smallfont.online` 或 `www.smallfont.online`）

### 2. 配置 DNS 记录

Cloudflare Pages 会要求你配置以下 DNS 记录：

#### 对于根域名（`smallfont.online`）：
```
Type: CNAME
Name: @
Target: [your-pages-subdomain].pages.dev
```

#### 对于 www 子域名（`www.smallfont.online`）：
```
Type: CNAME
Name: www
Target: [your-pages-subdomain].pages.dev
```

### 3. SSL/TLS 证书配置

1. 在 Cloudflare Dashboard 中进入 SSL/TLS 设置
2. 选择 "Flexible" 或 "Full" 模式：
   - **Flexible**：Cloudflare 和你的服务器之间不加密
   - **Full**：Cloudflare 和你的服务器之间加密（推荐）

## 多语言域名配置

由于你的网站支持多语言，建议配置以下域名结构：

### 主域名配置
- `smallfont.online` → 跳转到 `www.smallfont.online`
- `www.smallfont.online` → 主要英文版本

### 语言特定子域名（可选）
```
en.smallfont.online → English
ja.smallfont.online → 日本語
ko.smallfont.online → 한국어
de.smallfont.online → Deutsch
es.smallfont.online → Español
ar.smallfont.online → العربية
```

### 实现语言子域名的 DNS 配置

为每个语言子域名添加以下 DNS 记录：

```
Type: CNAME
Name: en
Target: [your-pages-subdomain].pages.dev

Type: CNAME
Name: ja
Target: [your-pages-subdomain].pages.dev

Type: CNAME
Name: ko
Target: [your-pages-subdomain].pages.dev

Type: CNAME
Name: de
Target: [your-pages-subdomain].pages.dev

Type: CNAME
Name: es
Target: [your-pages-subdomain].pages.dev

Type: CNAME
Name: ar
Target: [your-pages-subdomain].pages.dev
```

## 重定向规则配置

### 1. 根域名重定向到 www

在 Cloudflare Pages 中创建重定向规则：

1. 进入 Pages 项目设置
2. 添加重定向规则：
   - Source: `smallfont.online/*`
   - Target: `https://www.smallfont.online/$1`
   - Status: 301 (Permanent redirect)

### 2. 默认语言重定向

创建重定向规则将根路径重定向到默认语言：

1. 进入 Pages 项目设置
2. 添加重定向规则：
   - Source: `/`
   - Target: `/en/`
   - Status: 302 (Temporary redirect)

## 高级配置

### 地理位置重定向（按需）

如果需要根据用户地理位置自动重定向到对应语言版本：

1. 进入 Cloudflare Dashboard
2. 选择 "Geo Steering" 或使用 Cloudflare Workers
3. 创建基于地理位置的路由规则

### 性能优化

1. **缓存优化**：在 `_headers` 文件中已配置静态资源缓存
2. **CDN 加速**：Cloudflare Pages 自动提供全球 CDN
3. **图像优化**：考虑使用 Cloudflare Images 进行图像优化

## 验证配置

### 1. DNS 传播检查
使用在线工具检查 DNS 传播：
- [DNS Checker](https://dnschecker.org/)
- [Whatismyipaddress](https://whatismyipaddress.com/dns-lookup)

### 2. SSL 证书验证
- 访问 `https://yourdomain.com` 确认证书正常
- 检查浏览器地址栏的安全锁图标

### 3. 多语言功能测试
- 访问每个语言版本的 URL
- 测试语言切换功能
- 验证元数据和结构化数据

## 故障排除

### 常见问题

1. **DNS 解析失败**
   - 等待 DNS 传播（通常需要 24-48 小时）
   - 检查 DNS 记录是否正确配置
   - 确认域名在 Cloudflare 中正确托管

2. **SSL 证书问题**
   - 等待证书颁发（通常需要几分钟到几小时）
   - 检查 SSL/TLS 加密模式设置
   - 确认域名指向正确的 Pages 地址

3. **重定向不工作**
   - 检查重定向规则语法
   - 确认规则优先级和顺序
   - 测试具体的重定向路径

4. **多语言路由问题**
   - 检查 URL 路径是否正确
   - 验证语言配置文件
   - 测试语言切换功能

## 维护和监控

### 定期检查
1. 监控域名到期时间
2. 检查 SSL 证书状态
3. 验证所有语言版本可访问
4. 测试重定向功能

### 性能监控
1. 使用 Cloudflare Analytics 监控访问情况
2. 设置性能警报
3. 监控错误率和响应时间

## 支持联系方式

如果遇到问题，请联系：
- Cloudflare 支持：通过 Dashboard 提交工单
- 域名注册商：处理 DNS 相关问题
- 项目维护者：应用层面的问题

## 成本考虑

- **Cloudflare Pages**：每月 100 万请求免费
- **自定义域名**：如果域名未托管在 Cloudflare，需要额外费用
- **高级功能**：如地理位置重定向可能产生额外费用