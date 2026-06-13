# 🏐 HANDBALL TORWART ANALYSE
## Vollständiges Benutzerhandbuch

---

## 📑 INHALTSVERZEICHNIS

1. [Willkommen](#willkommen)
2. [Schnellstart](#schnellstart)
3. [Interface & Navigation](#interface--navigation)
4. [Würfe erfassen - Schritt für Schritt](#würfe-erfassen---schritt-für-schritt)
5. [Statistiken analysieren](#statistiken-analysieren)
6. [Daten verwalten](#daten-verwalten)
7. [Sound-Effekte](#sound-effekte)
8. [Häufig gestellte Fragen](#häufig-gestellte-fragen)
9. [Technische Informationen](#technische-informationen)

---

## 🎯 WILLKOMMEN

Dieses Handbuch führt Sie durch die **Handball Torwart Analyse** (tw-wurfbild) - eine moderne Web-App zur Erfassung und Analyse von Handball-Schüssen.

**Entwickelt von:**
- Alexander Kiforiuk (KI-KiFfi.com, Deutschland)
- Claude Code (AI Development Partner)

© 2026 - Alle Rechte vorbehalten

### Systemvoraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Internetverbindung für Live-Nutzung
- Offline-Funktionalität vorhanden (Daten werden lokal gespeichert)

---

## 🚀 SCHNELLSTART

### App öffnen
1. Öffnen Sie: **https://tw-wurfbild.ki-kiffy.com**
2. Keine Installation oder Login notwendig
3. App lädt sofort - Sie können direkt beginnen

### Erste Aufnahme (5 Minuten)
1. **Torwart wählen** - Wählen Sie TW 1, TW 2 oder TW 3
2. **Timer starten** (optional) - Klick auf ▶️ Button
3. **Wurfposition angeben** - Wählen Sie eine der 8 Positionen
4. **Gegenspieler-Nummer** - Geben Sie die Nummer ein (z.B. 5, 7, 9)
5. **Wurfzone markieren** - Wählen Sie Makro-Zone und Mikro-Zone
6. **Ergebnis eintragen** - TOR (🎯) / GEHALTEN (✋) / VORBEI (❌)
7. **Fertig!** - Nächster Wurf startet automatisch

---

## 🎨 INTERFACE & NAVIGATION

### Header-Layout (3 Zeilen)

**ZEILE 1: Logos & Titel**
```
[HSG LOGO]  🏐 HANDBALL TW ANALYSE  [SGU LOGO]
```
- Links: HSG Logo (Vereins-Logo)
- Mitte: Anwendungstitel
- Rechts: SGU Logo (Untere Filz)

**ZEILE 2: Action-Buttons (gleichmäßig verteilt)**
```
[Alles Löschen] [Importieren] [Exportieren] [Impressum]
```
- 🗑️ **Alles Löschen**: Löscht ALLE erfassten Daten (Vorsicht!)
- 📥 **Importieren**: Lädt Excel/CSV-Dateien
- 📤 **Exportieren**: Speichert Daten als Excel-Datei
- 📋 **Impressum**: Zeigt Autor-Informationen & rechtliche Infos

**ZEILE 3: Torwart + Timer + Tabs**
```
Torwart: [TW 1 ▼]  00:15  ▶️ ⏸️ ±1s ±1m 🔄  [Input] [Statistik]
```
- Torwart-Auswahl (TW 1, TW 2, TW 3)
- Timer-Anzeige (MM:SS)
- Timer-Kontrollen
- Tab-Navigation

### Hauptbereich

**INPUT-TAB** (Standard-View)
- Wurfposition-Buttons (8 Optionen)
- Gegenspieler-Eingabe
- Wurfzonen-Auswahl
- Live-Wurflist unten

**STATISTIK-TAB**
- Gegenspieler-Filter
- Heatmap mit 9 Zonen
- Statistik-Boxen (Würfe, Tore, Quote)
- Detaillierte Wurf-Tabelle

---

## 📊 WÜRFE ERFASSEN - SCHRITT FÜR SCHRITT

### SCHRITT 1: Wurfposition

Wählen Sie, VON WO aus der Spieler geworfen hat:

| Position | Name | Erklärung |
|----------|------|-----------|
| **LA** | Links Außen | Linke Seite, außen |
| **RL** | Rechts Links | Rechte Seite, links |
| **RM** | Rechts Mitte | Rechte Seite, Mitte |
| **RR** | Rechts Rechts | Rechte Seite, rechts |
| **RA** | Rechts Außen | Rechte Seite, außen |
| **KM** | Kreis Mitte | Direkt vor dem Tor (Kreis-Position) |
| **7m** | 7-Meter | Von der 7-Meter-Linie |
| **TG** | Torwurf | Direkter Torwurf vom Torwart |

💡 **Tipp:** Nutzen Sie die Bilder links und rechts der Buttons als Orientierung!

### SCHRITT 2: Gegenspieler-Nummer

Geben Sie die **Rückennummer** des werfenden Spielers ein:
- Gültig: 1-99
- **Auto-Advance:** Nach 2 Ziffern geht es automatisch weiter
- Beispiele: 5, 07, 23, 99

### SCHRITT 3: Makro-Zone (Grobe Position)

Wählen Sie, in welchen **groben Bereich** des Tors der Wurf zielte:

```
[1] [2] [3]    (Oben)
[4] [5] [6]    (Mitte)
[7] [8] [9]    (Unten)
```

**Heatmap-Legende:**
- 🟢 **Grün** = Weniger häufig anvisiert
- 🟡 **Gelb** = Mittelhäufig
- 🔴 **Rot** = Häufig anvisiert

### SCHRITT 4: Mikro-Zone (Feine Position)

Nach Auswahl der Makro-Zone (z.B. Zone 5), wählen Sie die **exakte Position**:

```
[1] [2] [3]    (Oben-Links / Oben-Mitte / Oben-Rechts)
[4] [5] [6]    (Mitte-Links / Mitte-Mitte / Mitte-Rechts)
[7] [8] [9]    (Unten-Links / Unten-Mitte / Unten-Rechts)
```

Dies ermöglicht **präzise Analyse** der Wurfziele.

### SCHRITT 5: Ergebnis

Markieren Sie, was mit dem Wurf passiert ist:

| Symbol | Ergebnis | Bedeutung |
|--------|----------|-----------|
| 🎯 | **TOR** | Erfolgreiches Tor |
| ✋ | **GEHALTEN** | Tor wurde gehalten/abgewehrt |
| ❌ | **VORBEI** | Wurf ging vorbei |

**Fertig!** Der Wurf wird gespeichert und Sie können den nächsten erfassen.

---

## 📈 STATISTIKEN ANALYSIEREN

### Gegenspieler-Auswahl

1. Klicken Sie auf die **Statistik-Tab** oben
2. Wählen Sie einen **Gegenspieler** aus der Dropdown-Liste
3. Alle Statistiken aktualisieren sich sofort

### Statistik-Boxen

```
┌─────────────┬─────────────┬─────────────┬──────────────┐
│  WÜRFE      │    TORE     │  GEHALTEN   │  ERFOLGSQUOTE│
│  GESAMT     │             │             │              │
│     15      │      7      │      5      │   46,7%      │
└─────────────┴─────────────┴─────────────┴──────────────┘
```

Diese 4 Boxen geben einen **schnellen Überblick**:
- Gesamtzahl Würfe
- Erfolgreiche Tore
- Gehaltene Würfe
- Erfolgsquote in Prozent

### Heatmap (Wurfzonen-Übersicht)

Die **Heatmap** zeigt, wo der Spieler am häufigsten wirft:

```
[1] [2] [3]
[4] [5] [6]    🟡 = 1-3 Würfe
[7] [8] [9]    🔴 = 4+ Würfe (bevorzugte Zonen)
```

**Interaktiv:** 
- Klicken Sie auf eine Zone, um die **Mikro-Zonen** dieser Zone zu sehen
- Klick auf "← Zurück zu Makro-Zonen" um die Übersicht zu verlassen

### Wurf-Tabelle

Am Boden finden Sie eine **detaillierte Tabelle** mit allen Würfen:

| Zeit | TW | Position | Grob | Fein | Ergebnis |
|------|----|---------:|-----:|-----:|----------|
| 00:15 | TW 1 | LA | 1 | 2 | 🎯 TOR |
| 00:23 | TW 2 | RM | 5 | 5 | ✋ GEHALTEN |

---

## 💾 DATEN VERWALTEN

### Daten Exportieren (Backup)

1. Klicken Sie auf **Exportieren** Button oben
2. Eine Excel-Datei wird heruntergeladen
3. Speichern Sie diese als **Backup**

**Datei-Name:** `handball_tw_analyse.xlsx`

### Daten Importieren

**Excel-Datei vorbereiten:**

Ihre Datei sollte folgende Spalten haben:

| Spalte | Beispiel | Anforderung |
|--------|----------|-------------|
| time | 00:15 | Im Format MM:SS |
| torwart | TW 1 | TW 1, TW 2, oder TW 3 |
| gegenspieler | 7 | Nummer 1-99 |
| wurfposition | LA | Siehe Schritt 1 |
| macroZone | 5 | Nummer 1-9 |
| microZone | 4 | Nummer 1-9 |
| ergebnis | tor | tor, gehalten, oder vorbei |

**Flexible Spaltenbezeichnungen:**
Die App akzeptiert auch alternative Namen:
- `Zeit`, `zeit` (statt `time`)
- `TW`, `Torwart` (statt `torwart`)
- `Opponent`, `#` (statt `gegenspieler`)
- `Grob`, `Macro` (statt `macroZone`)
- `Fein`, `Micro` (statt `microZone`)
- `Result`, `Outcome` (statt `ergebnis`)

**Import durchführen:**

1. Klicken Sie auf **Importieren** Button oben
2. Wählen Sie Ihre Excel-Datei aus
3. Bestätigung: "✅ X Würfe importiert!"
4. Die Daten werden zu Ihren bestehenden Würfen hinzugefügt

### Alle Daten Löschen

⚠️ **VORSICHT:** Dieser Button löscht ALLE Daten!

1. Klicken Sie auf **Alles Löschen** (roter Button)
2. Bestätigung erforderlich
3. Alle Würfe werden gelöscht (kann nicht rückgängig gemacht werden)

💡 **Tipp:** Machen Sie vorher einen **Export** (Backup)!

### Timer verwenden

```
⏱️ 00:15

▶️   = Start/Resume
⏸️  = Pause
➕1s = 1 Sekunde hinzufügen
➖1s = 1 Sekunde abziehen
➕1m = 1 Minute hinzufügen
➖1m = 1 Minute abziehen
🔄   = Zurücksetzen auf 00:00
```

Der Timer wird mit jedem Wurf gespeichert für spätere Analyse.

---

## 🔊 SOUND-EFFEKTE

### Automatische Ton-Signale

Die App gibt **Ton-Signale** ab:

| Event | Sound | Beschreibung |
|-------|-------|-------------|
| **Play** ▶️ | START-Ton | Timer startet |
| **Pause** ⏸️ | STOP-Ton | Timer wird pausiert |

### Lautstärke

- Standard: **50%** der Gerätelautstärke
- Ändern Sie die **Lautstärke Ihres Geräts** oder Browsers
- Die Sounds helfen beim fokussierten Training

---

## ❓ HÄUFIG GESTELLTE FRAGEN

### Funktioniert die App ohne Internet?

**Ja!** Die App funktioniert offline:
- Würfe werden **lokal gespeichert**
- Internet wird nur zum Laden benötigt
- Zum **Export/Import** brauchen Sie Internet

### Wie lange werden meine Daten gespeichert?

**Solange Sie den Browser-Cache nicht löschen:**
- Daten sind lokal im Browser gespeichert
- Beim Leeren des Cache gehen die Daten verloren
- **Empfehlung:** Regelmäßig **Exportieren** (Backup)!

### Kann ich auf mehreren Geräten arbeiten?

**Nein direkt, aber:**
- Exportieren Sie auf Gerät 1
- Importieren Sie auf Gerät 2
- Die Daten sind dann auf Gerät 2 vorhanden

### Welche Browser werden unterstützt?

✅ Chrome / Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile Browser

### Ich habe die Daten verloren - was nun?

**Leider nicht wiederherstellbar** wenn:
- Sie den Browser-Cache geleert haben
- Sie kein Backup exportiert haben

**In Zukunft:**
- Exportieren Sie regelmäßig!
- Speichern Sie Backups auf Ihrem PC

### Kann ich die Erfolgsquote nach Position filtern?

**Noch nicht**, aber Sie können:
- Die Statistiken nach **Gegenspieler** filtern
- Die **Heatmap** zoomen für Details
- Den **Export** machen und in Excel analysieren

### Wie viele Gegenspieler kann ich tracken?

**Unbegrenzt!** Nummern 1-99 sind möglich.

---

## 📋 TECHNISCHE INFORMATIONEN

### Über diese Anwendung

**Name:** Handball Torwart Analyse (tw-wurfbild)
**Version:** 1.0.0
**Entwicklung:** Alexander Kiforiuk & Claude Code
**Website:** https://ki-kiffy.com
**Live-App:** https://tw-wurfbild.ki-kiffy.com

### Impressum

**Verantwortlich für Inhalt:**

Alexander Kiforiuk
KI-KiFfi.com
Deutschland

**Mit Unterstützung von:**

Claude Code
Anthropic AI Development
https://claude.com/claude-code

**Copyright:** © 2026 Alexander Kiforiuk & Claude Code
Alle Rechte vorbehalten.

### Lizenz & Rechtliches

- Diese Software wird "AS IS" bereitgestellt
- Keine Gewährleistung für Richtigkeit oder Vollständigkeit
- Nutzung auf eigene Verantwortung

### Datenschutz

- Keine Cloud-Speicherung
- Alle Daten verbleiben lokal auf Ihrem Gerät
- Keine Cookies oder Tracking
- Keine persönlichen Daten werden übertragen

---

## 📞 SUPPORT & KONTAKT

**Probleme oder Vorschläge?**

- Website: https://ki-kiffy.com
- Impressum öffnen: Klick auf **Impressum**-Button in der App

---

**Viel Erfolg beim Training! 🏐⚽**

*Dieses Handbuch wurde am 14.06.2026 erstellt*
*Gedruckt am: _______________*

