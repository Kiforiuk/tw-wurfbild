import { Info, FileText } from 'lucide-react'

export default function Footer({ onOpenImprint, onOpenHelp }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 flex-wrap">
        {/* Logo & Verein */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Vereinslogo"
            className="h-8 w-8 rounded"
            onError={(e) => e.target.style.display = 'none'}
          />
          <span className="text-sm text-gray-400">Handball Verein</span>
        </div>

        {/* Help Links */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            <Info size={16} />
            <span>Hilfe</span>
          </button>
          <button
            onClick={onOpenImprint}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            <FileText size={16} />
            <span>Impressum</span>
          </button>
        </div>

        {/* Version & Copyright */}
        <div className="text-xs text-gray-500 text-right">
          <p>v1.0.0</p>
          <p>© 2026 Handball Verein</p>
        </div>
      </div>
    </footer>
  )
}
