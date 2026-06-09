import { useState, useEffect } from 'react'
import { Trash2, Download, RotateCcw, Upload, BarChart3 } from 'lucide-react'
import Header from './components/Header'
import ShotPositionStep from './components/steps/ShotPositionStep'
import OpponentNumberStep from './components/steps/OpponentNumberStep'
import GoalTargetMacroStep from './components/steps/GoalTargetMacroStep'
import GoalTargetMicroStep from './components/steps/GoalTargetMicroStep'
import OutcomeStep from './components/steps/OutcomeStep'
import StatisticsTab from './components/StatisticsTab'
import './App.css'

export default function App() {
  // UI State
  const [currentTab, setCurrentTab] = useState('input') // 'input' or 'statistics'
  const [currentStep, setCurrentStep] = useState(1)

  // Match State
  const [currentHalf, setCurrentHalf] = useState('1. HZ')
  const [currentGoalie, setCurrentGoalie] = useState('1')
  const [shots, setShots] = useState([])

  // Timer State
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Current Shot State
  const [currentShot, setCurrentShot] = useState({
    shotPosition: null,
    opponentNumber: null,
    goalTargetMacro: null,
    goalTargetMicro: null,
    outcome: null,
  })

  // Timer Effect
  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedShots = localStorage.getItem('handball_shots')
    if (savedShots) {
      setShots(JSON.parse(savedShots))
    }
  }, [])

  // Save to localStorage whenever shots change
  useEffect(() => {
    localStorage.setItem('handball_shots', JSON.stringify(shots))
  }, [shots])

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600)
    const mins = Math.floor((secs % 3600) / 60)
    const secsLeft = secs % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`
  }

  const handleStepComplete = (stepData) => {
    const updatedShot = { ...currentShot, ...stepData }
    setCurrentShot(updatedShot)

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save complete shot with timer
      const newShot = {
        id: Date.now(),
        timestamp: formatTime(seconds),
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

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const csv = event.target?.result
        const lines = csv.split('\n')
        const headers = lines[0].split(';')

        const importedShots = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(';')
          return {
            id: parseInt(values[0]),
            timestamp: values[1],
            matchTime: values[2],
            goalie: values[3],
            shotPosition: values[4],
            opponentNumber: parseInt(values[5]),
            goalTargetMacro: parseInt(values[6]),
            goalTargetMicro: parseInt(values[7]),
            outcome: values[8],
          }
        })

        setShots([...shots, ...importedShots])
        alert(`✅ ${importedShots.length} Würfe importiert!`)
      } catch (error) {
        alert('❌ Fehler beim Import! Bitte überprüfe die CSV-Datei.')
      }
    }
    reader.readAsText(file)
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

  const handleTimerToggle = () => {
    setIsRunning(!isRunning)
  }

  const handleAddMinute = () => {
    setSeconds(seconds + 60)
  }

  const handleSubtractMinute = () => {
    if (seconds >= 60) setSeconds(seconds - 60)
  }

  const handleAddSecond = () => {
    setSeconds(seconds + 1)
  }

  const handleSubtractSecond = () => {
    if (seconds > 0) setSeconds(seconds - 1)
  }

  const handleResetTimer = () => {
    setSeconds(0)
    setIsRunning(false)
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
        timer={formatTime(seconds)}
        onTimerToggle={handleTimerToggle}
        isRunning={isRunning}
        onAddMinute={handleAddMinute}
        onSubtractMinute={handleSubtractMinute}
        onAddSecond={handleAddSecond}
        onSubtractSecond={handleSubtractSecond}
        onResetTimer={handleResetTimer}
      />

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex gap-4">
          <button
            onClick={() => setCurrentTab('input')}
            className={`px-6 py-3 font-semibold text-lg transition ${
              currentTab === 'input'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            📊 Input
          </button>
          <button
            onClick={() => setCurrentTab('statistics')}
            className={`px-6 py-3 font-semibold text-lg transition flex items-center gap-2 ${
              currentTab === 'statistics'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BarChart3 size={20} />
            Statistik
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4 md:p-8">
        {currentTab === 'input' && (
          <>
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

            {/* Import Button */}
            <div className="fixed bottom-6 right-6">
              <label className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold cursor-pointer transition">
                <Upload size={20} />
                <span className="hidden sm:inline">Importieren</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </>
        )}

        {currentTab === 'statistics' && (
          <StatisticsTab shots={shots} />
        )}
      </main>
    </div>
  )
}
