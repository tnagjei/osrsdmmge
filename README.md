# OSRS DMM Tracker

Real-time Deadman Mode gold price tracker and profit calculator for Old School RuneScape players.

## 🌟 Features

- **Live DMM Swap Rates** - Current DMM to OSRS gold exchange rates
- **Profit Leaderboard** - Top 20 items with highest flipping margins
- **Real-time Data** - Powered by RuneScape Wiki API
- **Multi-language** - English, Finnish, Swedish, Norwegian
- **Dark OSRS Theme** - Gold accents, professional design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173/en/
```

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
osrsdmmge/
├── public/              # Build output
├── src/
│   ├── components/      # Header, footer, layout data
│   ├── pages/           # Nunjucks templates
│   │   ├── en/         # English
│   │   ├── fi/         # Finnish
│   │   ├── sv/         # Swedish
│   │   └── no/         # Norwegian
│   ├── static-root/     # Static files (robots.txt, sitemap.xml)
│   └── styles/          # Tailwind CSS
├── scripts/             # Build scripts
└── docs/                # Documentation
```

## 🌍 Languages

| Code | Language | Status |
|------|----------|--------|
| `en` | English | ✅ |
| `fi` | Suomi | ✅ |
| `sv` | Svenska | ✅ |
| `no` | Norsk | ✅ |

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build production |
| `npm run build:pages` | Build Nunjucks templates |
| `npm run tailwind:build` | Build CSS |

## ☁️ Deployment

Deploy to Cloudflare Pages:

```bash
npm run build
npx wrangler pages deploy public --project-name=osrsdmmge
```

## 📞 Contact

- Email: tangjei414@gmail.com
- Telegram: [@tangjei](https://t.me/tangjei)

## 📄 License

MIT License