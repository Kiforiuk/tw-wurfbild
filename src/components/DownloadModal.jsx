import { X, FileText, Download } from 'lucide-react'

export default function DownloadModal({ isOpen, onClose, onExportExcel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-blue-400">📥 Daten Herunterladen</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Excel Export */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="flex items-start gap-3">
              <FileText className="text-green-400 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">Excel-Datei (.xlsx)</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Alle Würfe als Excel-Datei exportieren. Optimal für weitere Bearbeitung oder Backup.
                </p>
                <button
                  onClick={() => {
                    onExportExcel()
                    onClose()
                  }}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-bold w-full justify-center transition"
                >
                  <Download size={16} />
                  Exportieren
                </button>
              </div>
            </div>
          </div>

          {/* PDF Report */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 opacity-50 cursor-not-allowed">
            <div className="flex items-start gap-3">
              <FileText className="text-red-400 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">PDF-Bericht (Kommt bald)</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Schöner Trainings-Bericht als PDF mit Statistiken und Heatmaps.
                </p>
                <button
                  disabled
                  className="flex items-center gap-2 bg-gray-600 px-3 py-1 rounded text-sm font-bold w-full justify-center cursor-not-allowed"
                >
                  Nicht verfügbar
                </button>
              </div>
            </div>
          </div>

          {/* CSV Export */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 opacity-50 cursor-not-allowed">
            <div className="flex items-start gap-3">
              <FileText className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">CSV-Datei (Kommt bald)</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Export als CSV-Datei für weitere Datenanalyse.
                </p>
                <button
                  disabled
                  className="flex items-center gap-2 bg-gray-600 px-3 py-1 rounded text-sm font-bold w-full justify-center cursor-not-allowed"
                >
                  Nicht verfügbar
                </button>
              </div>
            </div>
          </div>
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
