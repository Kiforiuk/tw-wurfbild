import { useState, useEffect } from 'react'
import { Trash2, Download, Upload, Play, Pause, RotateCcw } from 'lucide-react'
import InputTab from './components/InputTab'
import StatisticsTab from './components/StatisticsTab'
import './App.css'

export default function App() {
  const [currentTab, setCurrentTab] = useState('input')
  const [wurfe, setWurfe] = useState([])
  const [currentTorwart, setCurrentTorwart] = useState('Pasqual')
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const saved = localStorage.getItem('handball_wurfe')
    if (saved) setWurfe(JSON.parse(saved))
    const savedState = localStorage.getItem('handball_state')
    if (savedState) {
      const state = JSON.parse(savedState)
      setCurrentTorwart(state.currentTorwart || 'Pasqual')
      setTimerSeconds(state.timerSeconds || 0)
    }
  }, [])

  useEffect(() => {
    let interval
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  useEffect(() => {
    localStorage.setItem('handball_wurfe', JSON.stringify(wurfe))
    localStorage.setItem('handball_state', JSON.stringify({
      currentTorwart,
      timerSeconds
    }))
  }, [wurfe, currentTorwart, timerSeconds])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const addWurf = (wurfData) => {
    const newWurf = {
      id: Date.now(),
      time: formatTime(timerSeconds),
      torwart: currentTorwart,
      ...wurfData
    }
    setWurfe([...wurfe, newWurf])
    setCurrentStep(1)
  }

  const deleteAllWurfe = () => {
    if (window.confirm('⚠️ ALLE Daten werden gelöscht!\n\nDas kann nicht rückgängig gemacht werden.\n\nWirklich?')) {
      setWurfe([])
      localStorage.removeItem('handball_wurfe')
      localStorage.removeItem('handball_state')
      alert('✅ Alle Daten gelöscht!')
    }
  }

  const handleTimerButton = (action) => {
    if (action === 'play') setIsTimerRunning(true)
    if (action === 'pause') setIsTimerRunning(false)
    if (action === 'plus1s') setTimerSeconds(s => s + 1)
    if (action === 'minus1s') setTimerSeconds(s => Math.max(0, s - 1))
    if (action === 'plus1m') setTimerSeconds(s => s + 60)
    if (action === 'minus1m') setTimerSeconds(s => Math.max(0, s - 60))
    if (action === 'reset') setTimerSeconds(0)
  }

  const handleExport = async () => {
    try {
      const XLSX = await import('xlsx')
      const ws = XLSX.utils.json_to_sheet(wurfe)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Würfe')
      XLSX.writeFile(wb, 'handball_tw_analyse.xlsx')
      alert('✅ Exportiert!')
    } catch (err) {
      alert('❌ Export fehlgeschlagen')
    }
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const XLSX = await import('xlsx')
        const wb = XLSX.read(event.target.result, { type: 'array' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(ws)

        const importedWurfe = data.map((row, idx) => ({
          id: Date.now() + idx,
          time: row.time || '00:00',
          torwart: row.torwart || 'Pasqual',
          gegenspieler: parseInt(row.gegenspieler) || 0,
          wurfposition: row.wurfposition || '',
          macroZone: parseInt(row.macroZone) || 0,
          microZone: parseInt(row.microZone) || 0,
          ergebnis: row.ergebnis || ''
        }))

        setWurfe([...wurfe, ...importedWurfe])
        alert(`✅ ${importedWurfe.length} Würfe importiert!`)
      } catch (err) {
        alert('❌ Import fehlgeschlagen: ' + err.message)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* TOP-BAR: Fest oben verankert */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-b border-slate-700 z-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Row 1: Title & Action Buttons */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400">🏐 Handball TW Analyse</h1>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={deleteAllWurfe}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 md:px-6 py-3 rounded-lg font-bold transition text-sm md:text-base min-h-[44px]"
              >
                <Trash2 size={20} />
                <span className="hidden sm:inline">Alles Löschen</span>
              </button>

              <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 md:px-6 py-3 rounded-lg font-bold cursor-pointer transition text-sm md:text-base min-h-[44px]">
                <Upload size={20} />
                <span className="hidden sm:inline">Importieren</span>
                <input type="file" onChange={handleImport} accept=".xlsx,.xls,.csv" hidden />
              </label>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 md:px-6 py-3 rounded-lg font-bold transition text-sm md:text-base min-h-[44px]"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Exportieren</span>
              </button>
            </div>
          </div>

          {/* Row 2: Torwart + Timer + Tabs */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Torwart Selection */}
            <div className="flex items-center gap-2 md:gap-4">
              <label className="text-sm font-bold text-gray-300 whitespace-nowrap">Torwart:</label>
              <select
                value={currentTorwart}
                onChange={(e) => setCurrentTorwart(e.target.value)}
                className="bg-slate-700 border border-slate-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base cursor-pointer min-h-[44px]"
              >
                <option>Pasqual</option>
                <option>Mathi</option>
                <option>Mitsch</option>
              </select>
            </div>

            {/* Timer Display & Controls */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-slate-800 border-2 border-blue-500 px-4 md:px-6 py-2 md:py-3 rounded-lg font-mono text-2xl md:text-4xl font-bold min-w-[120px] md:min-w-[160px] text-center">
                {formatTime(timerSeconds)}
              </div>

              <div className="flex gap-1 md:gap-2 flex-wrap">
                {!isTimerRunning ? (
                  <button
                    onClick={() => handleTimerButton('play')}
                    className="bg-green-600 hover:bg-green-700 p-2 md:p-3 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Start"
                  >
                    <Play size={20} md:size={24} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleTimerButton('pause')}
                    className="bg-yellow-600 hover:bg-yellow-700 p-2 md:p-3 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Pause"
                  >
                    <Pause size={20} md:size={24} />
                  </button>
                )}

                {!isTimerRunning && (
                  <>
                    <button
                      onClick={() => handleTimerButton('plus1s')}
                      className="bg-blue-600 hover:bg-blue-700 px-2 md:px-3 py-2 md:py-3 rounded-lg text-xs md:text-sm font-bold transition min-h-[44px]"
                      title="+1 Sekunde"
                    >
                      +1s
                    </button>
                    <button
                      onClick={() => handleTimerButton('minus1s')}
                      className="bg-blue-600 hover:bg-blue-700 px-2 md:px-3 py-2 md:py-3 rounded-lg text-xs md:text-sm font-bold transition min-h-[44px]"
                      title="-1 Sekunde"
                    >
                      -1s
                    </button>
                    <button
                      onClick={() => handleTimerButton('plus1m')}
                      className="bg-blue-600 hover:bg-blue-700 px-2 md:px-3 py-2 md:py-3 rounded-lg text-xs md:text-sm font-bold transition min-h-[44px]"
                      title="+1 Minute"
                    >
                      +1m
                    </button>
                    <button
                      onClick={() => handleTimerButton('minus1m')}
                      className="bg-blue-600 hover:bg-blue-700 px-2 md:px-3 py-2 md:py-3 rounded-lg text-xs md:text-sm font-bold transition min-h-[44px]"
                      title="-1 Minute"
                    >
                      -1m
                    </button>
                    <button
                      onClick={() => handleTimerButton('reset')}
                      className="bg-red-600 hover:bg-red-700 p-2 md:p-3 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Zurücksetzen"
                    >
                      <RotateCcw size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentTab('input')}
                className={`px-3 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition min-h-[44px] ${
                  currentTab === 'input'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <span className="hidden sm:inline">Live-Eingabe</span>
                <span className="sm:hidden">Input</span>
              </button>
              <button
                onClick={() => setCurrentTab('stats')}
                className={`px-3 md:px-6 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition min-h-[44px] ${
                  currentTab === 'stats'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Stats ({wurfe.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="pt-[320px] md:pt-[280px] pb-8 px-4 max-w-7xl mx-auto">
        {currentTab === 'input' ? (
          <InputTab
            onAddWurf={addWurf}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <StatisticsTab wurfe={wurfe} />
        )}
      </div>
    </div>
  )
}
