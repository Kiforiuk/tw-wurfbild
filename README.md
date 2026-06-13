# 🏐 Handball Torwart Analyse (tw-wurfbild)

**Production URL:** https://tw-wurfbild.ki-kiffy.com

## 📋 Übersicht

Eine moderne Web-App zur Analyse von Handball-Schüssen. Trainer können Würfe in Echtzeit erfassen und detaillierte Statistiken und Heatmaps abrufen.

## 🏗️ Technische Architektur

### Tech-Stack
- **Frontend:** React 18 mit Vite
- **Styling:** Tailwind CSS
- **Build:** Vite 4.5
- **Icons:** Lucide React
- **Data:** XLSX Library
- **Storage:** Browser LocalStorage
- **Deployment:** GitHub Pages + GitHub Actions

## 🎯 Core Features

### 1. Input-Workflow (5 Schritte)
- **Wurfposition:** LA, RL, RM, RR, RA, KM, 7m, TG
- **Gegenspieler:** Nummern 1-99
- **Makro-Zone:** 1-9 (3x3 Grid)
- **Mikro-Zone:** 1-9 (fein Details)
- **Ergebnis:** Tor 🎯 / Gehalten ✋ / Vorbei ❌

### 2. Live-Wurflist
- Chronologische Anzeige aller Würfe
- **Undo-Button** für letzten Wurf
- Format: Zeit | TW | # | Position | Zone | Ergebnis

### 3. Statistik-Auswertung
- **Gegenspieler-Filter**
- **Makro-Zone Heatmap** (3x3 mit Farbcodierung)
- **Zoom auf Mikro-Zonen**
- **Statistik-Boxen:** Würfe, Tore, Gehalten, Quote
- **Detaillierte Wurf-Tabelle**

### 4. Import/Export
- **Excel Import** (.xlsx, .xls, .csv)
- **Flexible Spalten** (case-insensitive, mehrere Namen)
- **Excel Export** - vollständiger Datensatz

### 5. Timer
- Play/Pause, ±1s/±1min, Reset

## 🚀 Development

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # Production build
npm run preview          # Preview build
```

## 🔄 Deployment

**GitHub Actions** deployt automatisch bei jedem Push zu `main`:
1. Node.js 18 Setup
2. Dependences Install
3. Production Build
4. GitHub Pages Deploy

**Workflow:** `.github/workflows/deploy.yml`

## 📝 Data Structure

```javascript
{
  id: 1718265600001,
  time: "00:15",
  torwart: "TW 1",
  gegenspieler: 7,
  wurfposition: "LA",
  macroZone: 5,
  microZone: 4,
  ergebnis: "tor"
}
```

## 🐛 Known Issues

- Vereinslogo noch nicht integriert
- Impressum noch nicht implementiert
- Download-Feature noch nicht verfügbar

---

**Version:** 1.0.0 | **Last Updated:** 2026-06-13
