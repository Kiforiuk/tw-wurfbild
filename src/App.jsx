import { useState, useEffect } from 'react'
import { Trash2, Download, Upload, Play, Pause, RotateCcw, FileText } from 'lucide-react'
import InputTab from './components/InputTab'
import StatisticsTab from './components/StatisticsTab'
import ImprintModal from './components/ImprintModal'
import './App.css'

export default function App() {
  const [currentTab, setCurrentTab] = useState('input')
  const [wurfe, setWurfe] = useState([])
  const [currentTorwart, setCurrentTorwart] = useState('TW 1')
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showImprint, setShowImprint] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('handball_wurfe')
    if (saved) setWurfe(JSON.parse(saved))
    const savedState = localStorage.getItem('handball_state')
    if (savedState) {
      const state = JSON.parse(savedState)
      setCurrentTorwart(state.currentTorwart || 'TW 1')
      setTimerSeconds(state.timerSeconds || 0)
    }

    // PWA Install Prompt Handler
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
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

  const deleteLastWurf = () => {
    if (wurfe.length > 0) {
      setWurfe(wurfe.slice(0, -1))
    }
  }

  const deleteAllWurfe = () => {
    if (window.confirm('⚠️ ALLE Daten werden gelöscht!\n\nDas kann nicht rückgängig gemacht werden.\n\nWirklich?')) {
      setWurfe([])
      localStorage.removeItem('handball_wurfe')
      localStorage.removeItem('handball_state')
      alert('✅ Alle Daten gelöscht!')
    }
  }

  const playSound = (soundId) => {
    try {
      const audio = document.getElementById(soundId)
      if (audio) {
        audio.currentTime = 0
        audio.play().catch(err => console.log('Sound play error:', err.message))
      }
    } catch (err) {
      console.log('Sound error:', err.message)
    }
  }

  const handleTimerButton = (action) => {
    if (action === 'play') {
      setIsTimerRunning(true)
      playSound('startSound')
    }
    if (action === 'pause') {
      setIsTimerRunning(false)
      playSound('stopSound')
    }
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

  const handleInstallApp = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
      alert('✅ App installiert! Jetzt kannst du sie offline nutzen.')
    }
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const XLSX = await import('xlsx')

        // Read file with different type based on file extension
        let wb
        const fileName = file.name.toLowerCase()
        if (fileName.endsWith('.csv')) {
          // For CSV, read as text first
          const csvText = new TextDecoder().decode(event.target.result)
          wb = XLSX.read(csvText, { type: 'string' })
        } else {
          // For Excel files, read as array buffer
          wb = XLSX.read(event.target.result, { type: 'array' })
        }

        const ws = wb.Sheets[wb.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(ws, { defval: '' })

        // Normalize column names to handle different cases and variations
        const normalizedData = data.map(row => {
          const normalized = {}
          Object.keys(row).forEach(key => {
            const lowerKey = key.toLowerCase().trim()
            if (lowerKey === 'time' || lowerKey === 'zeit') normalized.time = row[key]
            else if (lowerKey === 'torwart' || lowerKey === 'tw' || lowerKey === 'goalkeeper') normalized.torwart = row[key]
            else if (lowerKey === 'gegenspieler' || lowerKey === 'opponent' || lowerKey === 'spieler' || lowerKey === '#') normalized.gegenspieler = row[key]
            else if (lowerKey === 'wurfposition' || lowerKey === 'position' || lowerKey === 'pos') normalized.wurfposition = row[key]
            else if (lowerKey === 'macrozone' || lowerKey === 'macro' || lowerKey === 'grob' || lowerKey === 'zone') normalized.macroZone = row[key]
            else if (lowerKey === 'microzone' || lowerKey === 'micro' || lowerKey === 'fein') normalized.microZone = row[key]
            else if (lowerKey === 'ergebnis' || lowerKey === 'result' || lowerKey === 'outcome') normalized.ergebnis = row[key]
          })
          return normalized
        })

        const importedWurfe = normalizedData
          .filter(row => row.gegenspieler || row.wurfposition || row.ergebnis) // Filter out empty rows
          .map((row, idx) => ({
            id: Date.now() + idx,
            time: String(row.time || '00:00'),
            torwart: String(row.torwart || 'TW 1'),
            gegenspieler: parseInt(row.gegenspieler) || 0,
            wurfposition: String(row.wurfposition || ''),
            macroZone: parseInt(row.macroZone) || 0,
            microZone: parseInt(row.microZone) || 0,
            ergebnis: String(row.ergebnis || '')
          }))

        if (importedWurfe.length === 0) {
          alert('⚠️ Keine gültigen Würfe in der Datei gefunden. Bitte überprüfe das Format.')
          return
        }

        setWurfe([...wurfe, ...importedWurfe])
        alert(`✅ ${importedWurfe.length} Würfe importiert!`)
      } catch (err) {
        console.error('Import error:', err)
        alert('❌ Import fehlgeschlagen: ' + err.message + '\n\nBitte überprüfe, dass die Datei im Excel-Format ist und die erwarteten Spalten enthält.')
      }
    }

    // Read file as array buffer (works for both Excel and CSV)
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* TOP-BAR: Fest oben verankert */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-b border-slate-700 z-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Row 1: Logos - Title - Logos */}
          <div className="flex items-center justify-between gap-4">
            {/* Left Logo */}
            <div className="w-16 md:w-20">
              <img
                src="/logos/hsg-logo.jpg"
                alt="HSG Logo"
                className="h-12 md:h-16 w-auto rounded"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>

            {/* Center Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400 text-center flex-1">🏐 Handball TW Analyse</h1>

            {/* Right Logo */}
            <div className="w-16 md:w-20">
              <img
                src="/logos/sgu-logo.bmp"
                alt="SGU Logo"
                className="h-12 md:h-16 w-auto rounded"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          </div>

          {/* Row 2: Action Buttons - equally distributed */}
          <div className="flex items-center gap-3">
            <button
              onClick={deleteAllWurfe}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition text-sm min-h-[44px] flex-1"
            >
              <Trash2 size={20} />
              <span>Alles Löschen</span>
            </button>

            <label htmlFor="import-file" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold cursor-pointer transition text-sm min-h-[44px] flex-1">
              <Upload size={20} />
              <span>Importieren</span>
              <input id="import-file" type="file" onChange={handleImport} accept=".xlsx,.xls,.csv" hidden />
            </label>

            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold transition text-sm min-h-[44px] flex-1"
            >
              <Download size={20} />
              <span>Exportieren</span>
            </button>

            <button
              onClick={() => setShowImprint(true)}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold transition text-sm min-h-[44px] flex-1"
              title="Impressum und Informationen anzeigen"
            >
              <FileText size={20} />
              <span>Impressum</span>
            </button>

            {showInstallPrompt && (
              <button
                onClick={handleInstallApp}
                className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 py-3 rounded-lg font-bold transition text-sm min-h-[44px] flex-1 animate-pulse"
                title="App auf Gerät installieren und offline nutzen"
              >
                <Download size={20} />
                <span>App Installieren</span>
              </button>
            )}
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
                <option>TW 1</option>
                <option>TW 2</option>
                <option>TW 3</option>
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
            wurfe={wurfe}
            onDeleteLast={deleteLastWurf}
          />
        ) : (
          <StatisticsTab wurfe={wurfe} />
        )}
      </div>

      {/* Imprint Modal */}
      <ImprintModal isOpen={showImprint} onClose={() => setShowImprint(false)} />
    </div>
  )
}
