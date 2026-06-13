import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function HelpModal({ isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState(0)

  if (!isOpen) return null

  const sections = [
    {
      title: '🎯 Wie erfasse ich einen Wurf?',
      content: 'Gehe zum "Input" Tab und folge den 5 Schritten: (1) Wurfposition wählen → (2) Gegenspieler-Nummer → (3) Makro-Zone → (4) Mikro-Zone → (5) Ergebnis (Tor/Gehalten/Vorbei). Nach dem letzten Schritt wird der Wurf gespeichert und du kannst sofort den nächsten erfassen.'
    },
    {
      title: '📊 Wie sehe ich die Statistiken?',
      content: 'Klick auf den "Statistik-Auswertung" Tab. Wähle einen Gegenspieler aus. Du siehst dann: (1) Statistik-Boxen (Würfe, Tore, Quote) (2) Heatmap (wo wirft der Spieler am meisten) (3) Detaillierte Wurf-Tabelle mit allen Informationen.'
    },
    {
      title: '🌡️ Was ist die Heatmap?',
      content: 'Die Heatmap zeigt, wo ein Spieler am meisten wirft. Grüne Zonen = wenig Würfe, Gelbe Zonen = 1-3 Würfe, Rote Zonen = häufige Positionen. Du kannst auf eine rote Zone klicken, um die Details (Mikro-Zonen) zu sehen.'
    },
    {
      title: '💾 Wie speichere ich meine Daten?',
      content: 'Alle Daten werden automatisch gespeichert! Unter "Exportieren" kannst du die Daten als Excel-Datei herunterladen. Diese kannst du später wieder mit "Importieren" hochladen.'
    },
    {
      title: '📥 Wie importiere ich Excel-Daten?',
      content: 'Klick auf "Importieren", wähle deine Excel-Datei. Die Datei kann folgende Spalten haben: time, torwart, gegenspieler, wurfposition, macroZone, microZone, ergebnis. Die App akzeptiert flexible Spaltennamen (Zeit, TW, #, Position, Grob, Fein, Ergebnis, etc.)'
    },
    {
      title: '⏱️ Wie nutze ich den Timer?',
      content: 'Der Timer oben zeigt die Spielzeit. Du kannst ihn starten (Play), pausieren (Pause), oder mit den +/- Buttons anpassen. Die Zeit wird mit jedem Wurf gespeichert.'
    },
    {
      title: '🔄 Wie lösche ich einen Wurf?',
      content: 'Zum Löschen des letzten Wurfs: Gehe zum Input Tab, scroll zu "Würfe" unten und klick "↶ Undo". Zum Löschen ALLER Daten: Klick "Alles Löschen" oben rechts (VORSICHT: kann nicht rückgängig gemacht werden!).'
    },
    {
      title: '📱 Funktioniert die App auf mobilen Geräten?',
      content: 'Ja! Die App ist vollständig responsive und funktioniert auf Tablets und Smartphones. Perfect für die Erfassung direkt am Spielfeld!'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-blue-400">❓ Hilfe & FAQ</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-2">
          {sections.map((section, idx) => (
            <div key={idx} className="border border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === idx ? -1 : idx)}
                className="w-full p-4 flex justify-between items-center hover:bg-slate-700 transition"
              >
                <span className="font-bold text-blue-400 text-left">{section.title}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition ${expandedSection === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSection === idx && (
                <div className="p-4 bg-slate-900 border-t border-slate-700 text-gray-300">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 bg-slate-900">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  )
}
