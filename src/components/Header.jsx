import { Trash2, Download, RotateCcw, Play, Pause, Plus, Minus } from 'lucide-react'

export default function Header({
  currentHalf,
  setCurrentHalf,
  currentGoalie,
  setCurrentGoalie,
  onUndo,
  onExport,
  onClearAll,
  shotCount,
  timer,
  onTimerToggle,
  isRunning,
  onAddMinute,
  onSubtractMinute,
  onAddSecond,
  onSubtractSecond,
  onResetTimer,
}) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">⚽ Handball Torwart Analyse</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Halbzeit Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">Halbzeit</label>
            <select
              value={currentHalf}
              onChange={(e) => setCurrentHalf(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white text-lg"
            >
              <option>1. HZ</option>
              <option>2. HZ</option>
            </select>
          </div>

          {/* Torwart Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">Torwart</label>
            <select
              value={currentGoalie}
              onChange={(e) => setCurrentGoalie(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white text-lg"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          {/* Shot Counter */}
          <div>
            <label className="block text-sm font-medium mb-2">Würfe</label>
            <div className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white text-lg font-bold">
              {shotCount}
            </div>
          </div>

          {/* Timer Display */}
          <div>
            <label className="block text-sm font-medium mb-2">Zeit</label>
            <div className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white text-lg font-bold font-mono">
              {timer}
            </div>
          </div>

          {/* Spacer */}
          <div></div>
        </div>

        {/* Timer Controls */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <button
              onClick={onTimerToggle}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold touch-target"
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              <span className="hidden sm:inline">{isRunning ? 'Pause' : 'Start'}</span>
            </button>

            <button
              onClick={onAddMinute}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold touch-target"
              title="+ 1 Minute"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">1min</span>
            </button>

            <button
              onClick={onSubtractMinute}
              className="flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded font-semibold touch-target"
              title="- 1 Minute"
            >
              <Minus size={18} />
              <span className="hidden sm:inline">1min</span>
            </button>

            <button
              onClick={onAddSecond}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold text-sm touch-target"
              title="+ 1 Sekunde"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">1s</span>
            </button>

            <button
              onClick={onSubtractSecond}
              className="flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded font-semibold text-sm touch-target"
              title="- 1 Sekunde"
            >
              <Minus size={16} />
              <span className="hidden sm:inline">1s</span>
            </button>

            <button
              onClick={onResetTimer}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold touch-target"
              title="Reset Timer"
            >
              <RotateCcw size={20} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onUndo}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded font-semibold text-base touch-target"
          >
            <RotateCcw size={20} />
            <span className="hidden sm:inline">Letzten löschen</span>
            <span className="sm:hidden">Undo</span>
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-base touch-target"
          >
            <Download size={20} />
            <span className="hidden sm:inline">Exportieren</span>
            <span className="sm:hidden">Export</span>
          </button>

          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold text-base touch-target"
          >
            <Trash2 size={20} />
            <span className="hidden sm:inline">Alle löschen</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .touch-target {
          min-height: 44px;
          min-width: 44px;
        }
      `}</style>
    </header>
  )
}
