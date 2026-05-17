# Supervisión de Pagos SBS – Peruvian Fintech Analytics Dashboard

> **Production-grade monitoring platform for Peruvian payment system oversight**
> Inspired by: Tremor, Stripe, Ramp, Linear & Bloomberg Terminal

[
  ![Stack](https://badgen.net/badge/stack/React%20%2B%20Vite%20%2B%20Tailwind/blue)
  ![Build](https://badgen.net/badge/build/passing/green)
  ![License](https://badgen.net/badge/license/MIT/gray)
]

---

## 📐 What Is This?

A unified **three-module** analytics platform for the **Superintendencia de Banca, Seguros y AFP (SBS)** of Peru. It empowers financial supervisors, analysts, and executives to monitor, compare, and detect anomalies across:

1.  **Sistema de Pagos** (Payment Channels: CCE, Yape, Plin, digital wallets)
2.  **Instituciones Financieras** (Per-bank performance, market share, peer analysis)
3.  **Mercado Cambiario** (USD/PEN exchange rate with technical indicators)

### Aesthetic Inspiration
| Reference | Adopted Principles |
|---|---|
| **Tremor** | Warm gray palette, rounded-2xl cards, aggressive whitespace |
| **Stripe** | Typography hierarchy, tabular precision, subtle shadows |
| **Linear** | Smooth transitions, hover micro-interactions, pristine spacing |
| **Bloomberg** | Data density, multi-chart dashboards, anomaly focus |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Dashboard SBS                         │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React 18 + TypeScript)                            │
│  ├── Module 1: Resumen Ejecutivo                             │
│  │     ├── KPI Cards (expandable)                            │
│  │     ├── Stacked Area Chart                               │
│  │     └── Pagos Digitales per Cápita 📈                    │
│  ├── Module 2: Instituciones Financieras                     │
│  │     ├── Peer Scatter Analysis                            │
│  │     ├── Institución Fingerprint (Radar)                  │
│  │     ├── Z-Score Timeline                                 │
│  │     ├── Anomaly Alert Stream 🚨                          │
│  │     └── Market Share + Growth Tables                     │
│  ├── Module 3: Mercado Cambiario                           │
│  │     ├── Premium Line Chart (MA 20/50)                    │
│  │     ├── Bollinger Bands 📊                               │
│  │     └── Event Annotations                                │
│  └── Shared: Sidebar, Header, Layout, Charts                │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (Mock → Future Real API)                        │
│  ├── Mock Payments (2013-2026)                              │
│  ├── Mock Peer Groups (Anomaly-injected)                    │
│  ├── Mock FX Rates (2016-2026)                              │
│  ├── Mock PEA (16.8M → 18.5M, seasonal)                   │
│  └── Ready for BCRP API integration 🌐                     │
├─────────────────────────────────────────────────────────────┤
│  Backend Skeleton (To be implemented)                         │
│  ├── Java Spring Boot (REST API)                            │
│  ├── Python ETL Pipelines                                   │
│  └── PostgreSQL Schema (with Liquibase/Flyway)              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂 Directory Structure

```
dashboard-sbs/
├── public/                          # Static assets (favicon, icons)
├── src/
│   ├── components/
│   │   ├── charts/                  # All Recharts-based graph components
│   │   │   ├── DigitalPaymentsPerCapita.tsx   # 📊 New: Pagos per Cápita
│   │   │   ├── PeerRadarChart.tsx             # 🎯 Institution fingerprint
│   │   │   ├── PeerScatterChart.tsx           # 🔍 Scatter plot analysis
│   │   │   ├── SparklineChart.tsx             # Mini line charts
│   │   │   ├── StackedAreaChart.tsx           # Payment composition
│   │   │   └── ZScoreChart.tsx                # ⚠️ Anomaly timeline
│   │   ├── layout/                  # Shell components
│   │   │   ├── DashboardLayout.tsx  # Main layout (Sidebar + Header + Content)
│   │   │   ├── Header.tsx           # Top navbar (search, notifications)
│   │   │   └── Sidebar.tsx          # Navigation (Resumen, Instituciones, FX)
│   │   └── shared/                  # Reusable UI components
│   │       ├── AlertStream.tsx      # 🚨 Anomaly alert feed
│   │       ├── KpiCard.tsx          # Expandable KPI card with sparkline
│   │       └── KpiCardExpanded.tsx  # Detail view for expanded KPI
│   ├── data/                        # 🧪 All mock data generators
│   │   ├── mockPayments.ts          # Original 2024-2026 data
│   │   ├── mockPaymentsExtended.ts  # 📅 Extended 2013-2026 data
│   │   ├── mockPea.ts               # 👥 Peruvian PEA (economically active population)
│   │   └── mockPeerGroups.ts        # 🏦 Peer group institutions with anomaly injection
│   ├── pages/                       # Main application pages
│   │   ├── OverviewPage.tsx         # 📍 Resumen Ejecutivo (Module 1)
│   │   ├── InstitutionsPage.tsx     # 🏦 Instituciones Financieras (Module 2)
│   │   └── FxMarketPage.tsx         # 💱 Mercado Cambiario (Module 3)
│   ├── types/
│   │   └── dashboard.ts             # TypeScript interfaces (PaymentMetric, Institution, FxDataPoint, etc.)
│   ├── lib/
│   │   └── dataUtils.ts             # Utilities (aggregateToYearly, etc.)
│   ├── index.css                    # Tailwind base styles
│   ├── main.tsx                     # Entry point (ReactDOM.createRoot)
│   └── App.tsx                      # Router setup + Routes
├── backend/                         # 🚀 Future backend skeleton
│   ├── java/
│   │   └── README.md                # Spring Boot architecture
│   ├── python/
│   │   └── README.md                # ETL pipeline architecture
│   └── schema.sql                   # 🗄 PostgreSQL script (tables, indexes, sample data)
├── docs/
│   └── README.md                    # Project documentation
├── index.html                       # HTML entry point (vite injects JS)
├── package.json                     # Dependencies & scripts
├── tailwind.config.js               # Tailwind v3 configuration
├── vite.config.ts                   # Vite build configuration
└── eslint.config.js                 # Linting rules
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0`

### 2. Install & Run

```bash
# 1. Navigate to project
cd dashboard-sbs

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### 3. Build for Production

```bash
npm run build
# Output: dist/ directory
```

---

## 🎓 Understanding the Modules

### Module 1: Resumen Ejecutivo (`/pages/OverviewPage.tsx`)
**Purpose**: High-level executive snapshot of the payment ecosystem

| Feature | Component | Data Source |
|---|---|---|
| **KPI Cards** | `KpiCard.tsx` → `KpiCardExpanded.tsx` | `mockPaymentsExtended.ts` |
| **Payment Composition** | `StackedAreaChart.tsx` | `mockPaymentsExtended.ts` (yape, plin, cce, other) |
| **Pagos per Cápita** ⭐ | `DigitalPaymentsPerCapita.tsx` | `mockPaymentsExtended.ts` ÷ `mockPea.ts` |
| **Expand Drilldown** | Click KPI → Framer Motion expand | Recharts area chart |

**Key Behavior**:
- KPI card expands inline (pushes grid down)
- Inside expanded card: full area chart, value, growth badge, close button
- Per Capita graph has **Mensual / Anual** toggle (monthly/yearly aggregation)

---

### Module 2: Instituciones Financieras (`/pages/InstitutionsPage.tsx`)
**Purpose**: Peer-to-peer anomaly detection and comparative analytics

| Feature | Component | Data Source |
|---|---|---|
| **Anomaly Alerts** | `AlertStream.tsx` | `mockPeerGroups.ts` (alertCards) |
| **Peer Selector** | Custom select dropdown | `peerGroupInstitutions` |
| **Scatter Analysis** | `PeerScatterChart.tsx` | Computed: volatility vs growth |
| **Radar Fingerprint** | `PeerRadarChart.tsx` | Computed: 6-dimension profile |
| **Z-Score Timeline** | `ZScoreChart.tsx` | Computed: statistical deviation |
| **Ranking Tables** | Inline in page | `institutionsData` |

**Key Anomalies Injected**:
- 🟡 **Scotia**: CCE spike +34% (Mar 2025, Z > 3.0)
- 🔴 **BanBif**: Immediate transfer drop -18% (Jun 2025, Z < -2.2)

**Anomaly Logic**:
```
Z = (Institution Value - Peer Mean) / Peer Std Dev
|Z| > 2.5  → Anomaly detected
|Z| > 3.5  → Critical severity
```

---

### Module 3: Mercado Cambiario (`/pages/FxMarketPage.tsx`)
**Purpose**: USD/PEN exchange rate tracking with technical indicators

| Feature | Component | Data Source |
|---|---|---|
| **Current Rate** | Summary cards | `generateFxData()` (mock) |
| **Moving Averages** | `Line` (Recharts) | MA 20, MA 50 |
| **Bollinger Bands** | `Area` with range | Upper/Lower bands |
| **5-Year History** | Area chart | Daily data 2016-2026 |

---

## 🧪 Mock Data Architecture

### Payment System (`mockPaymentsExtended.ts`)
```
Period: 2013-01 → 2026-03  (157 months)
Yape:     Exponential growth (started 2017)
Plin:     Linear growth (started 2019)
CCE:      Declining as digital rises
Other:    Small, fragmented
```

### PEA (`mockPea.ts`)
```
Base: 16,800K (2013)
Growth: 1.2% annual
Seasonality: ±0.5% sinusoidal (summer peak, winter trough)
Current: ~18,500K (2026)
```

### Peer Groups (`mockPeerGroups.ts`)
```
6 institutions × 27 months × 8 metrics per month
= 1,296 data points per institution
Injected anomalies: Scotia (spike), BanBif (drop)
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| **Background** | `bg-gray-50` | Page background |
| **Card** | `bg-white, rounded-xl, border-gray-200` | All card containers |
| **Shadow** | `shadow-sm` | Cards, hover: `shadow-md` |
| **Primary** | `#2563EB` (blue-600) | Main accent, links, active states |
| **Success** | `#10B981` (emerald-500) | Growth indicators, Yape |
| **Warning** | `#F59E0B` (amber-500) | Watchlist, CCE |
| **Danger** | `#EF4444` (red-500) | Critical anomalies, drops |

### Spacing Scale
```
Card padding: p-6 (24px)
Card gap:     gap-6 (24px)
Border:       rounded-xl (12px)
Font:         Inter (Google Fonts)
```

---

## 📊 Future Roadmap

| Phase | Feature | Backend Needed |
|---|---|---|
| ✅ Done | Anomaly detection (Z-score) | No |
| ✅ Done | Peer group comparison | No |
| ✅ Done | Pagos per Cápita (2013-2026) | No |
| 🚧 Next | BCRP API integration | Yes (Spring Boot proxy) |
| 🚧 Next | Real-time alerts (WS) | Yes (WebSocket) |
| 🚧 Next | ML anomaly detection | Yes (Python / TensorFlow) |
| 🚧 Next | Authentication (RBAC) | Yes (JWT) |

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit changes: `git commit -m "feat: added X"`
4. Push: `git push origin feat/my-feature`

---

## 📄 License

MIT – Open for financial supervisors and fintech developers alike.

---

**Built with ❤️ for Supervisión de Pagos SBS**