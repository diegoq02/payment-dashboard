# SBS Dashboard - Documentation

## Project Overview
Enterprise-grade financial analytics dashboard for Peruvian payment system supervision.

## Features
- 📊 Payment system overview (CCE, Yape, Plin)
- 🏦 Financial institutions analytics
- 💱 FX market monitoring
- 📈 Advanced charts and visualizations
- 📋 Export to Excel functionality

## Technology Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- React Router

## Data Generation
Realistic mock data with behavioral models:
- **Yape**: Exponential growth
- **Plin**: Steady linear growth
- **CCE**: Structural decline

## Project Structure
```
dashboard-sbs/
├── public/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   ├── layout/
│   │   └── shared/
│   ├── pages/
│   ├── data/
│   ├── types/
│   └── index.css
├── backend/
│   ├── java/
│   └── python/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Getting Started
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Backend Integration
See `backend/java/README.md` and `backend/python/README.md`