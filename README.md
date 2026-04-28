# 🏭 Alibaba Clone — Global B2B Marketplace

> **Designed, Built & Deployed by Aura AI** 🤖

A full-fledged MVP clone of **Alibaba.com** — the world's leading B2B e-commerce platform. Built with modern React, Tailwind CSS, and a localStorage-powered database layer for instant deployment and demo readiness.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## 🚀 Live Demo

**[🔗 View Live Deployment](https://alibaba-clone-by-aura-ai.vercel.app)** 

---

## ✨ Features

### 🏠 Public Pages
| Feature | Description |
|---------|-------------|
| **Homepage** | Hero banner, category grid, trending products, featured suppliers |
| **Product Search** | Full-text search with real-time results |
| **Product Catalog** | Filter by category, price range, MOQ, supplier |
| **Product Detail** | Image gallery, specs, pricing tiers, supplier info, reviews |
| **Supplier Directory** | Verified supplier listings with ratings & stats |
| **Authentication** | Login & Register with role-based access (Buyer / Seller) |

### 🔒 Buyer Dashboard
| Feature | Description |
|---------|-------------|
| **Overview Stats** | Total orders, spending, wishlist, unread messages |
| **Order Management** | Track orders: Pending → Processing → Shipped → Delivered |
| **Messages** | Inbox with suppliers |
| **Wishlist** | Saved products for later |
| **Cart** | Add products, adjust quantities, checkout flow |
| **Profile Settings** | View account details |

### 🛠️ Technical Stack
- **Frontend:** React 18 + Vite + React Router DOM
- **Styling:** Tailwind CSS 3 + Custom design tokens
- **Icons:** Lucide React
- **Charts:** Recharts (for analytics dashboards)
- **State:** React Context API (Auth + Cart)
- **Database:** Chrome LocalStorage (persistent, no backend needed)
- **Mock Data:** 20+ products, 8 suppliers, 8 categories, pre-seeded orders & messages

---

## 🖥️ Screenshots

| Home | Products | Product Detail | Dashboard |
|------|----------|----------------|-----------|
| Hero with search | Grid with filters | Image gallery + specs | Buyer analytics |

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ (tested on v25.6.1)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Linuxthecoder/alibaba-clone-by-auraai.git
cd alibaba-clone-by-auraai

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
# Output: dist/ folder ready for Vercel/Netlify
```

---

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Buyer | `buyer@demo.com` | `demo123` |
| Seller | `seller@demo.com` | `demo123` |

---

## 📁 Project Structure

```
alibaba-clone/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level pages
│   ├── layouts/         # Page layouts (Main, Auth)
│   ├── context/         # React Context (Auth, Cart)
│   ├── lib/             # Utilities, Database, Mock Data
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Main app router
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json          # Vercel deployment config
└── README.md
```

---

## 🌍 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Deploy — done!

### Manual
```bash
npm run build
# Upload dist/ folder to any static host
```

---

## 🎯 Roadmap / TODO

- [ ] Connect real backend API (REST/GraphQL)
- [ ] Add real payment integration (Stripe / PayPal)
- [ ] Multi-language support (i18n)
- [ ] Seller dashboard with inventory management
- [ ] Real-time messaging (WebSockets)
- [ ] Advanced search with Elasticsearch
- [ ] Mobile app (React Native)

---

## 📝 License

**MIT License** — Open source, free to use and modify.

---

## 🙌 Credits

| | |
|:---|:---|
| **Concept** | Alibaba.com |
| **Design & Development** | [Aura AI](https://github.com/Linuxthecoder) |
| **Built With** | React, Vite, Tailwind CSS, Lucide Icons, Recharts |

> *"This project was entirely designed, architected, and developed by Aura AI — an autonomous software engineering agent."*

---

## 📬 Contact

For questions, collaborations, or custom builds:

- **GitHub:** [@Linuxthecoder](https://github.com/Linuxthecoder)
- **Project Repo:** [alibaba-clone-by-auraai](https://github.com/Linuxthecoder/alibaba-clone-by-auraai)

---

<p align="center">
  <sub>Built with ⚡ by Aura AI</sub>
</p>
