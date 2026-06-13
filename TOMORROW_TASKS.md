# 📋 Aufgaben für Morgen (2026-06-14)

## Status
✅ **DOKUMENTATION ABGESCHLOSSEN**
- README.md ✅ Technische Dokumentation
- USERGUIDE.md ✅ Benutzerhandbuch
- Komponenten vorbereitet ✅

---

## 🎯 Priorität 1: Neue Komponenten Integration

### 1.1 Footer-Integration
**File:** `src/components/Footer.jsx` (✅ vorbereitet)
**Aufgabe:**
- [ ] Footer in App.jsx integrieren (oben im JSX)
- [ ] Footer-States hinzufügen: `showImprint` und `showHelp`
- [ ] onOpenImprint und onOpenHelp Handler definieren
- [ ] Margin-Bottom zu Main-Content für Platz hinzufügen

### 1.2 Impressum Modal
**File:** `src/components/ImprintModal.jsx` (✅ vorbereitet)
**Aufgabe:**
- [ ] Modal in App.jsx integrieren
- [ ] Benutzer-Input-Felder anfordern:
  - Vereinsname
  - Kontakt-Email
  - Telefon
  - Website
  - Verantwortliche Person
- [ ] Felder in Modal aktualisieren
- [ ] Styling anpassen (bereits vorbereitet)

### 1.3 Help Modal
**File:** `src/components/HelpModal.jsx` (✅ vorbereitet)
**Aufgabe:**
- [ ] Modal in App.jsx integrieren
- [ ] Teste alle FAQ-Sections (expandierbar/kollapsierbar)
- [ ] Prüfe Lesbarkeit auf Mobile
- [ ] Deutsche Texte verifizieren

### 1.4 Download Modal (Optional für morgen)
**File:** `src/components/DownloadModal.jsx` (✅ vorbereitet)
**Aufgabe:**
- [ ] Modal in App.jsx integrieren
- [ ] "Download" Button oben rechts (neben "Exportieren")
- [ ] Verlinke onExportExcel zum bestehenden Export-Handler
- [ ] Teste auf Functionality

---

## 🎨 Priorität 2: Vereinslogo Integration

**File:** `src/components/Footer.jsx` (Footer hat bereits Logo-Platzhalter)

**Aufgabe:**
- [ ] Logo-Datei als `/public/logo.png` speichern (Größe: 32x32px)
- [ ] Alternative: Link zu Online-Logo angeben
- [ ] Im Footer erscheint das Logo automatisch
- [ ] Alt-Text setzen

**Logo-Anforderungen:**
- Format: PNG oder SVG
- Größe: 32x32px oder größer (skaliert auf 32px)
- Transparent Background erwünscht

---

## 🔗 Priorität 3: App.jsx Integration Checklist

In `src/App.jsx` müssen folgende Importe hinzugefügt werden:

```javascript
import Footer from './components/Footer'
import ImprintModal from './components/ImprintModal'
import HelpModal from './components/HelpModal'
import DownloadModal from './components/DownloadModal'
```

**States hinzufügen:**
```javascript
const [showImprint, setShowImprint] = useState(false)
const [showHelp, setShowHelp] = useState(false)
const [showDownload, setShowDownload] = useState(false)
```

**Handlers hinzufügen:**
```javascript
const handleOpenImprint = () => setShowImprint(true)
const handleCloseImprint = () => setShowImprint(false)
const handleOpenHelp = () => setShowHelp(true)
const handleCloseHelp = () => setShowHelp(false)
const handleOpenDownload = () => setShowDownload(true)
const handleCloseDownload = () => setShowDownload(false)
```

**JSX-Struktur (ungefähr am Ende von return):**
```javascript
{/* Modals */}
<ImprintModal isOpen={showImprint} onClose={handleCloseImprint} />
<HelpModal isOpen={showHelp} onClose={handleCloseHelp} />
<DownloadModal isOpen={showDownload} onClose={handleCloseDownload} onExportExcel={handleExport} />

{/* Footer */}
<Footer onOpenImprint={handleOpenImprint} onOpenHelp={handleOpenHelp} />
```

**Main-Content Margin-Bottom:**
```javascript
// Zum Tab-Container (die Div mit den zwei Tabs) hinzufügen:
style={{ paddingBottom: '100px' }}  // Platz für Footer
```

---

## 📝 Priorität 4: Optional - Heatmap mit Tor-Visualisierung

Wenn Zeit vorhanden:
- [ ] SVG Tor-Grafik erstellen in StatisticsTab.jsx
- [ ] 9 Zonen auf Tor abbilden (visuell)
- [ ] Farben basierend auf Daten

---

## ✅ Checkliste vor dem Commit

- [ ] Alle Komponenten funktionieren
- [ ] Footer erscheint auf jeder Seite
- [ ] Modals öffnen/schließen korrekt
- [ ] Mobile-Responsive testen
- [ ] Keine Console-Errors
- [ ] LocalStorage funktioniert noch
- [ ] Import/Export funktioniert noch

---

## 🚀 Nach dem Commit

```bash
npm run build
git add .
git commit -m "Feature: Add Footer, Imprint, Help and Download modals"
git push https://TOKEN@github.com/Kiforiuk/tw-wurfbild.git main
```

GitHub Actions wird automatisch deployen!

---

## 📞 Notizen für Morgen

- **Logo-Datei bereitstellen** (32x32px PNG)
- **Vereinsdetails** für Impressum vorbereiten:
  - Vereinsname
  - Email
  - Telefon
  - Website
  - Verantwortlicher
- **Token für Push** wieder bereit haben (oder neues erstellen)

---

**Vorbereitung Status:** ✅ 100% Abgeschlossen
**Geschätzte Arbeitszeit morgen:** 1-2 Stunden

Viel Erfolg! 🎉
