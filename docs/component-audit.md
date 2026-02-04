# 公共片段差异清单（导航 / 页脚 / 语言提示）

## 1. Header / Navigation

- **结构固定**：品牌区（`sf` 圆标 + `small font online`）、主导航 `<nav>`、CTA 区域（Telegram 链接 + Discord 按钮）。
- **导航项分两类**：
  - *首页营销导航*（锚点 + 二级路由）——存在于 `src/{en,ja,ko,de,es,ar}/index.html`
    - 链接数量：9 个（7 个锚点 + Blog + Help）。
    - 文案：`en` 与 `ja`/`ar` 已本地化；`ko`/`de`/`es` 保留英文或半译状态。
  - *支持/政策页面导航*（仅跨页路由）——新增的占位页 `blog/help/about/privacy/terms`
    - 链接数量：5 个（Home、Help、About、Privacy、Terms）；部分语言仍是英文占位文案。
- **CTA 区域差异**：
  - Telegram 链接在所有页面一致。
  - Discord 按钮文案：`en` = Join Discord、`ja` = Discordに参加、`ar` = انضم إلى Discord，其余页面仍用“Discord”。
- **方向属性**：`src/ar/**/*.html` 带 `dir="rtl"`，其余语言是默认 LTR。

## 2. Footer

- **首页脚注**（`src/{en,ja,ko,de,es,ar}/index.html`）
  - 四列布局：`Explore`/`Support`/`Languages` 等栏目标题因语言不同而翻译程度不同（`ja`/`ar` 已本地化，`ko`/`de`/`es` 部分沿用英文）。
  - 页脚底部标语：每种语言均有自定义字符串，需要参数化。
- **占位页脚注**（新建的二级页面）
  - 三列 + 语言列，栏目标题固定为英文 `Navigation`、`Legal`，部分语言版本未翻译。
  - 第一列介绍文案沿用各语言 tagline（例如 `ko` “소형 디스플레이를 위한 타이포그래피 도구”）。

## 3. 语言提示脚本（`language-alert`）

- **已实现脚本**：
  - `src/en/*`：英文提示 `We detected … Switch …`。
  - `src/ja/index.html`：自定义日文提示模板 `… 版 small font サイトを見る`。
  - 新建占位页（`/blog|help|about|privacy|terms/`）均引入同一段英文消息模板。
- **缺失脚本**：`src/{ko,de,es,ar}/index.html` 未包含 `localeFallback` 脚本段，仅保留提示栏空壳，需要在抽离时补上。
- **需要参数化字段**：
  - `close` 按钮文本（随语言变化）。
  - 提示正文模板（至少区分英文/本地化版本，需支持 RTL 链接文案）。
  - 目标路径构造（基础 permalink 需根据当前页面是锚点页还是二级路由决定）。

## 4. 参数化清单

| 模块 | 必需变量 | 备注 |
| ---- | -------- | ---- |
| Header | `locale`、`logoLabel`（如保留统一英文可省）、`navItems[]`（`label` + `href` + 是否锚点）、`cta.discordLabel`、`direction` | 锚点导航需要在生成时区分首页 vs 其他页面 |
| Footer | `tagline`、栏目标题数组、栏目链接数组、版权年份/署名、底部标语 | 需支持语言列共享的 6 个语言/名称对 |
| Language alert | `closeLabel`、`messageTemplate(locale, pathSuffix)`、`defaultLocale` | RTL 页面在模板中避免嵌入双引号方向冲突 |

> 下一步：依据本清单设计 `src/components` 模板与 `layout-data.json` 数据结构，随后编写预构建脚本生成最终页面。
