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
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-b border-slate-700 z-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <h1 className="text-2xl font-bold text-blue-400">🏐 Handball TW Analyse</h1>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={deleteAllWurfe}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition touch-none"
              >
                <Trash2 size={24} />
                Alles Löschen
              </button>

              <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold cursor-pointer transition touch-none">
                <Upload size={24} />
                Importieren
                <input type="file" onChange={handleImport} accept=".xlsx,.xls,.csv" hidden />
              </label>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition touch-none"
              >
                <Download size={24} />
                Exportieren
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <select
              value={currentTorwart}
              onChange={(e) => setCurrentTorwart(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg font-bold text-lg cursor-pointer"
            >
              <option>Pasqual</option>
              <option>Mathi</option>
              <option>Mitsch</option>
            </select>

            <div className="flex items-center gap-3">
              <div className="bg-slate-800 border-2 border-blue-500 px-8 py-4 rounded-lg font-mono text-4xl font-bold min-w-[200px] text-center">
                {formatTime(timerSeconds)}
              </div>

              <div className="flex gap-2">
                {!isTimerRunning ? (
                  <button
                    onClick={() => handleTimerButton('play')}
                    className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition"
                  >
                    <Play size={28} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleTimerButton('pause')}
                    className="bg-yellow-600 hover:bg-yellow-700 p-3 rounded-lg transition"
                  >
                    <Pause size={28} />
                  </button>
                )}

                {!isTimerRunning && (
                  <>
                    <button
                      onClick={() => handleTimerButton('plus1s')}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-3 rounded-lg text-sm font-bold transition"
                    >
                      +1s
                    </button>
                    <button
                      onClick={() => handleTimerButton('minus1s')}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-3 rounded-lg text-sm font-bold transition"
                    >
                      -1s
                    </button>
                    <button
                      onClick={() => handleTimerButton('plus1m')}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-3 rounded-lg text-sm font-bold transition"
                    >
                      +1m
                    </button>
                    <button
                      onClick={() => handleTimerButton('minus1m')}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-3 rounded-lg text-sm font-bold transition"
                    >
                      -1m
                    </button>
                    <button
                      onClick={() => handleTimerButton('reset')}
                      className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
                    >
                      <RotateCcw size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentTab('input')}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition ${
                  currentTab === 'input'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Live-Eingabe
              </button>
              <button
                onClick={() => setCurrentTab('stats')}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition ${
                  currentTab === 'stats'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Statistik ({wurfe.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-80 pb-8 px-4 max-w-7xl mx-auto">
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

  const handleStepComplete = (stepData) => {
    const updatedShot = { ...currentShot, ...stepData }
    setCurrentShot(updatedShot)

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save complete shot
      const newShot = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString('de-DE'),
        matchTime: currentHalf,
        goalie: currentGoalie,
        shotPosition: updatedShot.shotPosition,
        opponentNumber: updatedShot.opponentNumber,
        goalTargetMacro: updatedShot.goalTargetMacro,
        goalTargetMicro: updatedShot.goalTargetMicro,
        outcome: updatedShot.outcome,
      }

      setShots([...shots, newShot])

      // Reset for next shot
      setCurrentShot({
        shotPosition: null,
        opponentNumber: null,
        goalTargetMacro: null,
        goalTargetMicro: null,
        outcome: null,
      })
      setCurrentStep(1)
    }
  }

  const handleUndo = () => {
    if (shots.length > 0) {
      const newShots = shots.slice(0, -1)
      setShots(newShots)
    }
  }

  const handleExport = () => {
    if (shots.length === 0) {
      alert('Keine Daten zum Exportieren!')
      return
    }

    const headers = ['ID', 'Uhrzeit', 'Halbzeit', 'Torwart', 'Wurfposition', 'Gegner #', 'Tor Grob', 'Tor Fein', 'Ergebnis']
    const rows = shots.map(shot => [
      shot.id,
      shot.timestamp,
      shot.matchTime,
      shot.goalie,
      shot.shotPosition,
      shot.opponentNumber,
      shot.goalTargetMacro,
      shot.goalTargetMicro,
      shot.outcome,
    ])

    const csv = [headers, ...rows]
      .map(row => row.join(';'))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'handball_tw_analyse.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClearAll = () => {
    if (window.confirm('Alle Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      setShots([])
      setCurrentStep(1)
      setCurrentShot({
        shotPosition: null,
        opponentNumber: null,
        goalTargetMacro: null,
        goalTargetMicro: null,
        outcome: null,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header
        currentHalf={currentHalf}
        setCurrentHalf={setCurrentHalf}
        currentGoalie={currentGoalie}
        setCurrentGoalie={setCurrentGoalie}
        onUndo={handleUndo}
        onExport={handleExport}
        onClearAll={handleClearAll}
        shotCount={shots.length}
      />

      <main className="flex-1 overflow-auto p-4 md:p-8">
        {currentStep === 1 && (
          <ShotPositionStep
            onSelect={(position) => handleStepComplete({ shotPosition: position })}
          />
        )}
        {currentStep === 2 && (
          <OpponentNumberStep
            onSelect={(number) => handleStepComplete({ opponentNumber: number })}
          />
        )}
        {currentStep === 3 && (
          <GoalTargetMacroStep
            onSelect={(zone) => handleStepComplete({ goalTargetMacro: zone })}
          />
        )}
        {currentStep === 4 && (
          <GoalTargetMicroStep
            selectedMacro={currentShot.goalTargetMacro}
            onSelect={(zone) => handleStepComplete({ goalTargetMicro: zone })}
          />
        )}
        {currentStep === 5 && (
          <OutcomeStep
            onSelect={(outcome) => handleStepComplete({ outcome })}
          />
        )}
      </main>
    </div>
  )
}
