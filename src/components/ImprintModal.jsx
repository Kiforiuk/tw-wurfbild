import { X } from 'lucide-react'

export default function ImprintModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-blue-400">Impressum</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-gray-300 space-y-6">
          {/* Angaben gemäß TMG */}
          <section>
            <h3 className="text-lg font-bold text-white mb-2">1. Angaben gemäß § 5 TMG</h3>
            <p>
              <strong>Verein:</strong> [VEREINSNAME]
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Bitte ergänzen Sie hier die offiziellen Vereinsangaben
            </p>
          </section>

          {/* Kontakt */}
          <section>
            <h3 className="text-lg font-bold text-white mb-2">2. Kontaktinformationen</h3>
            <p><strong>Email:</strong> [EMAIL]</p>
            <p><strong>Telefon:</strong> [TELEFON]</p>
            <p><strong>Website:</strong> [WEBSITE]</p>
          </section>

          {/* Verantwortlich */}
          <section>
            <h3 className="text-lg font-bold text-white mb-2">3. Verantwortlich für den Inhalt</h3>
            <p>[VERANTWORTLICHE PERSON/FUNKTION]</p>
          </section>

          {/* Haftung */}
          <section>
            <h3 className="text-lg font-bold text-white mb-2">4. Haftungsausschluss</h3>
            <p className="text-sm">
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
              Wir übernehmen jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte.
              Die Nutzung der Inhalte der Website geschieht auf eigene Gefahr des Nutzers.
            </p>
          </section>

          {/* Datenschutz */}
          <section>
            <h3 className="text-lg font-bold text-white mb-2">5. Datenschutz</h3>
            <p className="text-sm">
              Diese Website nutzt keine Cookies und sammelt keine persönlichen Daten.
              Alle Daten werden lokal im Browser gespeichert.
            </p>
          </section>
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
