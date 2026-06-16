# 🏐 Handball Torwart Analyse (TW Wurfbild)

**Echtzeit-Analyse von Handball-Schüssen für Torwarttrainer**

- 🌐 **Live**: https://tw-wurfbild.ki-kiffy.com
- 📱 **Mobile**: Vollständig optimiert für Smartphones
- 🌙 **Dark Mode**: Standardmäßig aktiviert  
- 📦 **PWA**: Offline-fähig, installierbar

---

## 🎯 Features

### Input-Workflow (5 Schritte)
1. **Wurfposition** - 8 Positionen (LA, RL, RM, RR, RA, KM, 7m, TG)
2. **Gegenspieler** - Nummern 1-99
3. **Makro-Zone** - 3x3 Grid (9 Zonen)
4. **Mikro-Zone** - 3x3 Grid pro Makro-Zone
5. **Ergebnis** - Tor / Gehalten / Vorbei

### Statistiken & Analyse
- **Live-Wurflist** mit Undo-Funktion
- **Gegenspieler-Filter** in Statistiken
- **3x3 Heatmap** mit Zoom auf Mikro-Zonen
- **Statistik-Boxen**: Würfe, Tore, Gehalten, Erfolgsquote
- **Detaillierte Tabelle** mit allen Würfen

### Weitere Features
- **Timer** mit Play/Pause, ±1s/±1min, Reset
- **🔊 Sound-Effekte** (START/STOP bei Timer)
- **Import/Export** Excel/CSV (flexible Spaltenbezeichnungen)
- **Mehrere Torwarte** (TW 1, TW 2, TW 3)
- **Impressum & Info** Modal

---

## 🏗️ Infrastruktur

### Tech-Stack
| Component | Technology |
|-----------|------------|
| Frontend | React 18 + Vite 4.5 |
| Styling | Tailwind CSS (Dark Mode) |
| Icons | Lucide React |
| Import/Export | XLSX Library |
| Storage | Browser LocalStorage |
| PWA | Service Worker + Web App Manifest |
| Deployment | GitHub Pages + GitHub Actions |

### Verzeichnisstruktur
```
handball-app/
├── src/
│   ├── App.jsx                          # Main component (timer, tabs, state)
│   ├── App.css                          # Dark mode styles
│   ├── components/
│   │   ├── InputTab.jsx                 # 5-step wizard
│   │   ├── StatisticsTab.jsx            # Heatmap + stats
│   │   ├── ImprintModal.jsx             # Legal info
│   │   └── steps/
│   │       ├── ShotPositionStep.jsx     # Position selection
│   │       ├── OpponentNumberStep.jsx   # Number input
│   │       ├── GoalZoneMacroStep.jsx    # Macro zone selection
│   │       ├── GoalZoneMicroStep.jsx    # Micro zone selection
│   │       └── OutcomeStep.jsx          # Result selection
│   └── main.jsx
├── public/
│   ├── sw.js                            # Service Worker (PWA)
│   ├── manifest.json                    # PWA Manifest
│   ├── sounds/
│   │   ├── START.mp3                    # Timer start sound
│   │   └── STOP.mp3                     # Timer pause sound
│   ├── logos/
│   │   ├── hsg-logo.jpg                 # HSG Logo
│   │   └── sgu-logo.bmp                 # SGU Logo
│   └── images/
│       ├── image1.png                   # Left field diagram
│       └── image2.png                   # Right field diagram
├── dist/                                # Production build (GitHub Pages)
├── .github/workflows/
│   └── deploy.yml                       # GitHub Actions workflow
├── index.html                           # Root HTML (Vite template)
├── vite.config.js
├── package.json
└── README.md                            # This file
```

### Datenspeicherung (LocalStorage)
```javascript
// All throws array
localStorage.getItem('handball_wurfe')
// Current state (goalkeeper + timer)
localStorage.getItem('handball_state')
```

---

## 🚀 Deployment

### GitHub Pages Architecture

```
GitHub Repository (main branch)
         ↓
    git push
         ↓
GitHub Actions (deploy.yml)
  - npm install
  - npm run build → dist/
  - Upload dist/ as artifact
         ↓
GitHub Pages Deployment
         ↓
https://tw-wurfbild.ki-kiffy.com (LIVE)
```

### WICHTIG: Asset Hashes Update

Nach jedem `npm run build` müssen die neuen Asset-Hashes in `index.html` aktualisiert werden:

```html
<script type="module" crossorigin src="/dist/assets/index-XXXXX.js"></script>
<link rel="stylesheet" href="/dist/assets/index-XXXXX.css">
```

**Warum**: GitHub Pages seriert Root `index.html`, nicht `dist/index.html`. Die Hashes ändern sich bei jedem Build.

---

## 💻 Lokale Entwicklung

### Quick Start
```bash
# Clone & install
cd C:\handball-app
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Push to GitHub (auto-deploy)
git add -A
git commit -m "Your message"
git push origin main
```

### Mobile Testing (Same WiFi)
```bash
# Get local IP
ipconfig | findstr IPv4

# On phone browser:
http://192.168.1.243:5173  # (adjust IP)
```

---

## 📱 Mobile Optimierungen

### Responsive Breakpoints
- **Mobile** (<768px): 2-column grid, smaller fonts
- **Tablet** (768-1024px): 4-column grid, medium fonts  
- **Desktop** (1024px+): Full layout with side images

### Key Classes
```css
hidden md:block      /* Hide on mobile/tablet, show on desktop */
hidden lg:block      /* Hide on mobile/tablet, show only large screens */
grid-cols-2          /* 2 columns on mobile */
md:grid-cols-4       /* 4 columns on tablet+ */
text-sm md:text-base /* Font scaling */
min-h-[44px]         /* Touch target minimum size */
```

### Mobile UI Decisions
- **Side Images**: Hidden on mobile/tablet (`hidden lg:block`)
- **Button Sizing**: Smaller on mobile (p-6), larger on desktop (p-8)
- **Font Sizes**: Responsive text scaling
- **Touch Targets**: All buttons ≥44px height

---

## 🔊 Audio Files (Sound Effects)

### Paths (Relative for GitHub Pages)
```
./sounds/START.mp3   → Triggered on timer start
./sounds/STOP.mp3    → Triggered on timer pause
```

### Implementation
```javascript
const playSound = (soundId) => {
  const audio = document.getElementById(soundId)
  if (audio) {
    audio.currentTime = 0
    audio.play().catch(() => {}) // Silent fail if autoplay blocked
  }
}
```

---

## 📦 PWA (Progressive Web App)

### Service Worker (public/sw.js)
- **Strategy**: Cache-first, network fallback
- **Offline**: Works without internet
- **Precached**: All essential assets

### Cached Assets
```
/, /index.html, /manifest.json
/logos/, /images/, /sounds/
/dist/assets/
```

### Installation
- **Android**: Menu → "Install app" or "Add to Home Screen"
- **iOS**: Safari → Share → "Add to Home Screen"

---

## 📊 Data Export Format

### Supported Import Columns (Case-Insensitive)
```
Zeit/time
Torwart/TW/goalkeeper
#/opponent/gegenspieler/spieler
Wurfposition/position/pos
MacroZone/macro/grob/zone
MicroZone/micro/fein
Ergebnis/result/outcome
```

### Example XLSX Export
```
Zeit    | TW  | #  | Wurfposition | Macro | Micro | Ergebnis
--------|-----|----|----|----|----|------
00:15   | TW1 | 5  | LA | 1  | 5  | tor
00:32   | TW1 | 7  | RM | 2  | 8  | gehalten
```

---

## 🐛 Troubleshooting

### Timer läuft nicht stabil
- ✅ Laptop-Localhost: Funktioniert normalerweise
- ❌ Problem: Komplexe playSound/localStorage während Timer-Interval
- **Lösung**: Timer-useEffect nicht anfassen, externen Code prüfen

### Sound funktioniert nicht online
- ❌ Problem: Absolute Pfade `/sounds/` auf GitHub Pages
- ✅ Lösung: Relative Pfade `./sounds/` in index.html

### App sieht online anders aus
- ❌ Problem: Browser-Cache ist veraltet
- ✅ Lösung: `Ctrl+Shift+R` (hard refresh ohne Cache)

### GitHub Actions Build schlägt fehl
- ✅ Check 1: Sind alle Dateien committed?
- ✅ Check 2: Hat index.html die neuesten Asset-Hashes?
- ✅ Check 3: Sind alle Dependencies in package.json?

---

## ✅ Produktionszeichen

| Kriterium | Status |
|-----------|--------|
| Timer stabil | ✅ |
| Sound funktioniert | ✅ |
| Mobile optimiert | ✅ |
| PWA offline | ✅ |
| GitHub Pages deploy | ✅ |
| Dark mode | ✅ |

---

## 📅 Versionierung

| Version | Datum | Status | Highlights |
|---------|-------|--------|-----------|
| 1.0 | 2026-06-16 | ✅ PRODUKTIV | Mobile optimiert, PWA, Online live |
| 0.9 | 2026-06-14 | ✅ Archiv | PWA + Dark Mode |
| 0.5 | 2026-06-12 | ✅ Archiv | Core Features |

---

## 🔄 Wiederaufnahme nach 6 Monaten

### Wenn du das Projekt wieder öffnest:

1. **Aktuellen Stand checken**
   ```bash
   cd C:\handball-app
   git log --oneline -n 5
   git status
   ```

2. **Dependencies aktualisieren** (optional)
   ```bash
   npm install
   npm audit fix
   ```

3. **Lokal starten**
   ```bash
   npm run dev
   # → localhost:5173
   ```

4. **Production deployten**
   ```bash
   npm run build
   # Update index.html mit neuen Asset-Hashes
   git push origin main
   # GitHub Actions deployt automatisch
   ```

5. **Tests**
   - Localhost: Timer, Sound, Mobile Layout
   - GitHub Pages: https://tw-wurfbild.ki-kiffy.com
   - Check: Alle Daten noch in LocalStorage?

---

## 👤 Kontakt / Support

- **Entwicklung**: Claude Code + Alexander Kiforiuk
- **Repository**: https://github.com/Kiforiuk/tw-wurfbild
- **Website**: https://tw-wurfbild.ki-kiffy.com
- **Email**: Kiforiuk@msn.com

---

**Status**: 🟢 Produktiv & Mobil-Ready  
**Zuletzt aktualisiert**: 2026-06-16  
**Nächste Review**: 2026-12-16 (6 Monate)
