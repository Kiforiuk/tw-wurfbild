# 👥 Handball TW Analyse - Benutzerhandbuch

**Für:** Trainer und Analysten
**Zielgruppe:** Desktop & Mobile

---

## 📖 Inhaltsverzeichnis

1. [Schnellstart](#schnellstart)
2. [Würfe erfassen](#würfe-erfassen)
3. [Statistiken anschauen](#statistiken-anschauen)
4. [Daten verwalten](#daten-verwalten)
5. [Häufig gestellte Fragen](#faq)

---

## 🚀 Schnellstart

### App öffnen
- Gehe zu: **https://tw-wurfbild.ki-kiffy.com**
- Keine Installation oder Login notwendig
- Funktioniert im Browser (Chrome, Firefox, Safari, Edge)

### Erste Schritte
1. **Timer starten** (optional) - Klick Play-Button oben
2. **Wurfposition wählen** - Wähle eine der 8 Positionen
3. **Gegenspieler eingeben** - Gib die Nummer ein
4. **Wurfzone markieren** - Wähle Makro-Zone und Mikro-Zone
5. **Ergebnis eintragen** - Tor, Gehalten oder Vorbei
6. **Nächster Wurf** - Automatisch zur Step 1 zurück

---

## 📊 Würfe erfassen

### Wurfpositionen (Step 1)

| Position | Name | Erklärung |
|----------|------|-----------|
| **LA** | Links Außen | Linke Seite außen |
| **RL** | Rechts Links | Rechte Seite links |
| **RM** | Rechts Mitte | Rechte Seite Mitte |
| **RR** | Rechts Rechts | Rechte Seite rechts |
| **RA** | Rechts Außen | Rechte Seite außen |
| **KM** | Kreis Mitte | Kreis Position (direkt vor Tor) |
| **7m** | 7-Meter | 7-Meter Linie |
| **TG** | Torwurf | Direkter Torwurf |

### Gegenspieler (Step 2)

- **Eingabe:** Zweistellig (z.B. "05" oder "23")
- **Auto-Advance:** Nach 2 Ziffern geht's automatisch weiter
- **Nummern:** 1-99 unterstützt

### Wurfzonen (Step 3 & 4)

Die Wurfzone ist in zwei Ebenen unterteilt:

#### Makro-Zone (Step 3)
```
1 2 3
4 5 6
7 8 9
```
- **1-3:** Oben (Eck-Links, Mitte-Oben, Eck-Rechts)
- **4-6:** Mitte (Links, Mitte, Rechts)
- **7-9:** Unten (Eck-Links, Mitte-Unten, Eck-Rechts)

#### Mikro-Zone (Step 4)
- Wähle eine Makro-Zone aus Step 3
- Dann wähle eine Mikro-Zone (1-9) innerhalb dieser Makro-Zone
- Ermöglicht detaillierte Analyse

### Ergebnis (Step 5)

Wähle das Ergebnis des Wurfs:

| Symbol | Ergebnis | Farbe |
|--------|----------|-------|
| 🎯 | **TOR** | Rot |
| ✋ | **GEHALTEN** | Grün |
| ❌ | **VORBEI** | Gelb |

---

## 📈 Statistiken anschauen

### Navigation zu Statistiken
- Klick auf **"Statistik-Auswertung"** Tab oben

### Gegenspieler auswählen
1. Klick auf Dropdown "Gegenspieler wählen"
2. Wähle eine Nummer aus
3. Statistiken werden sofort aktualisiert

### Statistik-Boxen
Die 4 Boxen oben zeigen:

| Box | Inhalt | Beispiel |
|-----|--------|----------|
| **WÜRFE GESAMT** | Alle Würfe des Gegenspielers | 15 |
| **TORE** | Erfolgreiche Würfe | 7 |
| **GEHALTEN** | Gehaltene Würfe | 5 |
| **ERFOLGSQUOTE** | Tore / Gesamt × 100 | 46,7% |

### Heatmap (Wurfzonen)

Die **3×3 Heatmap** zeigt, wo der Gegenspieler am meisten wirft:

#### Farben
- 🟢 **Grün** = 0 Würfe
- 🟡 **Gelb** = 1-3 Würfe
- 🔴 **Rot** = 4+ Würfe (häufige Zone)

#### Zoom in Detail
1. Klick auf eine **farbige Zone** (nur wenn Würfe dort vorhanden sind)
2. Sieht die **Mikro-Zonen** innerhalb dieser Makro-Zone
3. Klick **"← Zurück zu Makro-Zonen"** um zurückzugehen

### Wurf-Tabelle
Die Tabelle unten zeigt **alle einzelnen Würfe**:

| Spalte | Bedeutung |
|--------|-----------|
| **Zeit** | Uhrzeit des Wurfs |
| **TW** | Torwart Name (TW 1, TW 2, etc.) |
| **Position** | Wurfposition (LA, RM, etc.) |
| **Grob** | Makro-Zone (1-9) |
| **Fein** | Mikro-Zone (1-9) |
| **Ergebnis** | 🎯 TOR / ✋ GEHALTEN / ❌ VORBEI |

---

## 💾 Daten verwalten

### Timer-Funktionen

| Button | Funktion |
|--------|----------|
| ▶️ | Timer starten |
| ⏸️ | Timer pausieren |
| ➕ 1s | 1 Sekunde hinzufügen |
| ➖ 1s | 1 Sekunde abziehen |
| ➕ 1m | 1 Minute hinzufügen |
| ➖ 1m | 1 Minute abziehen |
| 🔄 | Timer zurücksetzen |

### Torwart-Auswahl
- Oben links neben dem Timer
- Wählbar: **TW 1**, **TW 2**, **TW 3**
- Wird mit jedem Wurf gespeichert

### Würfe löschen

#### Letzen Wurf löschen (Undo)
1. Gehe zum **Input Tab**
2. Scroll zu "Würfe" Liste unten
3. Klick **"↶ Undo"** Button
4. Letzter Wurf wird sofort gelöscht

#### Alle Daten löschen
1. Klick auf **"Alles Löschen"** Button oben rechts (Rot)
2. ⚠️ **VORSICHT:** Alle Würfe werden gelöscht!
3. Bestätige die Aktion

### Import aus Excel

#### Excel-Datei vorbereiten
Deine Datei sollte folgende Spalten haben (beliebige Namen):

```
time          Zeit des Wurfs (MM:SS)
torwart       Torwart Name (TW 1, TW 2, etc.)
gegenspieler  Spielernummer (1-99)
wurfposition  Position (LA, RM, etc.)
macroZone     Makro Zone (1-9)
microZone     Mikro Zone (1-9)
ergebnis      Ergebnis (tor, gehalten, vorbei)
```

**Flexible Namen:** Die App akzeptiert auch alternative Namen:
- `Zeit`, `zeit`, `time`
- `TW`, `Torwart`, `Goalkeeper`
- `Opponent`, `Spieler`, `#`
- `Position`, `Pos`, `Wurfposition`
- `Grob`, `Macro`, `MacroZone`
- `Fein`, `Micro`, `MicroZone`
- `Result`, `Outcome`, `Ergebnis`

#### Import durchführen
1. Klick **"Importieren"** Button oben (Blau)
2. Wähle deine Excel-Datei (.xlsx, .xls oder .csv)
3. Warte auf die Bestätigung: "✅ X Würfe importiert!"
4. Daten werden zu bestehenden Würfen hinzugefügt

### Export als Excel

1. Klick **"Exportieren"** Button oben (Grün)
2. Excel-Datei wird heruntergeladen: `handball_tw_analyse.xlsx`
3. Öffne die Datei in Excel/Calc für weitere Bearbeitung

### Daten-Persistenz
- **Automatisches Speichern** - Alle Würfe werden sofort gespeichert
- **Browser-Speicher** - Daten bleiben nach Neuladen erhalten
- **Geräte-spezifisch** - Jeder Browser/Gerät hat eigene Daten

---

## ❓ FAQ

### Wie lange werden meine Daten gespeichert?
Daten werden im Browser-Speicher gespeichert und bleiben, bis du sie löschst. Falls du deine Browser-Daten löschst, gehen die Daten verloren. **Empfehlung:** Regelmäßig exportieren als Backup!

### Funktioniert die App offline?
Ja! Die App funktioniert ohne Internet-Verbindung. Neue Würfe können erfasst werden. Der Import/Export braucht aber Internet.

### Können mehrere Trainer gleichzeitig arbeiten?
Nein. Jeder Browser speichert seine eigenen Daten. Für Teamwork: Export-Datei teilen und dann importieren.

### Wie ändere ich den Torwart-Namen?
Aktuell sind nur "TW 1", "TW 2", "TW 3" verfügbar. Custom-Namen folgen in zukünftigen Updates.

### Kann ich die Wurfzonen ändern?
Die Wurfzonen sind auf 1-9 (3×3 Grid) festgelegt und können nicht verändert werden.

### Welche Browser werden unterstützt?
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile Browser (Android Chrome, iOS Safari)

### Meine Daten sind weg - was kann ich tun?
Falls Browser-Cache geleert wurde:
1. Prüfe, ob du ein Backup (Excel-Export) hast
2. Importiere die Excel-Datei erneut
3. Falls kein Backup existiert - Daten sind leider weg. **Regelmäßige Backups empfohlen!**

---

## 🎓 Best Practices

### Datenqualität
- ✅ Konsistent bleiben bei Spieler-Nummern
- ✅ Timer-Einträge sind optional, aber hilfreich
- ✅ Regelmäßig exportieren als Backup

### Workflow
1. **Training:** Live-Erfassung während des Trainings
2. **Pause:** Schnelle Statistik-Überprüfung (Gegenspieler-Analyse)
3. **Nach Training:** Daten exportieren und archivieren

### Heatmap-Interpretation
- 🔴 **Rote Zonen** = Lieblingspositionen des Gegenspielers
- 🟡 **Gelbe Zonen** = Alternative Positionen
- 🟢 **Grüne Zonen** = Vermiedene Positionen

---

## 📞 Support

**Probleme oder Feedback?**
- Website: https://tw-wurfbild.ki-kiffy.com
- GitHub Issues: https://github.com/Kiforiuk/tw-wurfbild/issues

---

**Version:** 1.0.0 | Zuletzt aktualisiert: 2026-06-13
