# 🚀 Deployment Guide

**Anleitung für Production-Deployment auf GitHub Pages**

---

## Workflow: Von lokal zu Online

### 1️⃣ Lokale Änderungen machen
```bash
cd C:\handball-app
npm run dev
# Test auf http://localhost:5173
```

### 2️⃣ Production Build
```bash
npm run build
# Generiert: dist/ mit neuen Asset-Hashes
```

**Output** (Beispiel):
```
dist/index.html                         1.31 kB
dist/assets/index-696da7e1.js          179.47 kB
dist/assets/index-880ff7e6.css         22.68 kB
```

### 3️⃣ KRITISCH: Asset-Hashes aktualisieren

**Öffne root `index.html`:**
```html
<!-- ALTE Version -->
<script src="/dist/assets/index-696da7e1.js"></script>
<link rel="stylesheet" href="/dist/assets/index-880ff7e6.css">

<!-- NEUE Version (nach npm run build) -->
<script src="/dist/assets/index-ABC1234.js"></script>
<link rel="stylesheet" href="/dist/assets/index-XYZ5678.css">
```

**Warum?** GitHub Pages seriert Root `index.html`, nicht `dist/index.html`. Die Hashes müssen aktuell sein!

### 4️⃣ Git Commit & Push
```bash
git add -A
git commit -m "Feature: Description of changes

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push origin main
```

### 5️⃣ GitHub Actions deployt automatisch
- Trigger: `.github/workflows/deploy.yml`
- Build: `npm run build`
- Upload: `dist/` zu GitHub Pages
- Live: https://tw-wurfbild.ki-kiffy.com (in 1-2 Minuten)

---

## Troubleshooting

### ❌ "Asset not found" auf Website
**Symptom**: Seite lädt nicht, Browser-Konsole zeigt 404 Fehler

**Lösung**:
1. Check: Hashes in root `index.html` aktuell?
2. Check: `npm run build` ausgeführt?
3. Check: Alle Dateien commitet + gepusht?

### ❌ Sound funktioniert nicht online
**Symptom**: Audio-Elemente im HTML, aber kein Sound

**Check**:
```html
<!-- FALSCH -->
<source src="/sounds/START.mp3">

<!-- RICHTIG -->
<source src="./sounds/START.mp3">
```

Alle Pfade müssen **relativ** sein (`./`) für GitHub Pages!

### ❌ GitHub Actions Build failed
**Log ansehen**:
1. GitHub → Actions Tab
2. Letzter Workflow
3. "Build" Job → Fehlermeldung

**Häufige Fehler**:
- `npm install` fehlgeschlagen: Dependencies Problem
- `npm run build` fehlgeschlagen: Syntax-Fehler im Code
- `deploy-pages@v4` fehlgeschlagen: GitHub-Konfiguration

### ❌ App zeigt alten Stand
**Symptom**: Lokale Änderungen sind sichtbar, aber nicht online

**Lösung**:
1. `npm run build` neu ausführen
2. root `index.html` aktualisieren
3. `git push` erneut versuchen

---

## Checklist vor Deploy

- [ ] Lokale Tests erfolgreich auf 5173?
- [ ] `npm run build` ohne Fehler?
- [ ] Asset-Hashes in index.html aktuell?
- [ ] Alle Dateien `git add` + `git commit`?
- [ ] `git push origin main` erfolgreich?
- [ ] GitHub Actions läuft (Actions Tab)?
- [ ] Website aktualisiert sich in 1-2 Min?

---

## Asset Hash Quick-Find

Nach `npm run build`:
```bash
# Linux/Mac:
ls dist/assets/index-*.js | xargs basename

# PowerShell (Windows):
Get-ChildItem "dist\assets\index-*.js" | Select-Object -ExpandProperty Name

# Beispiel Output:
# index-696da7e1.js
# index-880ff7e6.css
```

Dann in `index.html` kopieren:
```html
<script src="/dist/assets/index-696da7e1.js"></script>
<link rel="stylesheet" href="/dist/assets/index-880ff7e6.css">
```

---

## GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 18
      - npm ci (install dependencies)
      - npm run build (generate dist/)
      - Upload artifact
  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - Deploy to GitHub Pages (automatisch)
```

**Monitoring**:
1. GitHub → Actions Tab
2. Letzten Workflow anschauen
3. Green ✅ = Erfolg, Red ❌ = Fehler

---

## Environment Variables

Aktuell keine `.env` Variablen nötig. Falls später hinzugefügt:

```bash
# .env.example (nicht committen!)
VITE_API_URL=https://api.example.com
```

```bash
# .github/workflows/deploy.yml anpassen:
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

---

## Rollback (Notfall)

Falls etwas schiefläuft:

```bash
# Letzten guten Commit finden
git log --oneline -n 10

# Zu älterem Commit zurückgehen
git reset --hard abc1234

# Force-Push (⚠️ NUR im Notfall!)
git push origin main --force
```

---

## Performance Optimization (Zukunft)

- [ ] Code-Splitting für große Komponenten
- [ ] Image-Optimierung (WebP)
- [ ] Bundle-Size Monitoring (npm run build outputtet Größe)
- [ ] Service Worker Update-Strategie

---

## Checkliste "Abschluss für 6 Monate"

- [x] README.md ist aktuell & vollständig
- [x] DEPLOYMENT.md dokumentiert Prozess
- [x] Alle kritischen Files sind commitet
- [x] GitHub Actions Workflow ist konfiguriert
- [x] Lokale npm_modules nicht commitet (.gitignore)
- [x] Keine Secrets im Code
- [x] Asset-Hashes aktuell

---

**Status**: ✅ Ready for Production  
**Last Updated**: 2026-06-16
