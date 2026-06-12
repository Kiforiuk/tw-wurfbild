import { useState } from 'react'
import ShotPositionStep from './steps/ShotPositionStep'
import OpponentNumberStep from './steps/OpponentNumberStep'
import GoalZoneMacroStep from './steps/GoalZoneMacroStep'
import GoalZoneMicroStep from './steps/GoalZoneMicroStep'
import OutcomeStep from './steps/OutcomeStep'

export default function InputTab({ onAddWurf, currentStep, setCurrentStep, wurfe = [], onDeleteLast }) {
  const [currentWurf, setCurrentWurf] = useState({
    wurfposition: null,
    gegenspieler: null,
    macroZone: null,
    microZone: null,
    ergebnis: null
  })

  const handlePositionSelect = (position) => {
    setCurrentWurf({ ...currentWurf, wurfposition: position })
    setCurrentStep(2)
  }

  const handleOpponentSelect = (number) => {
    setCurrentWurf({ ...currentWurf, gegenspieler: number })
    setCurrentStep(3)
  }

  const handleMacroZoneSelect = (zone) => {
    setCurrentWurf({ ...currentWurf, macroZone: zone })
    setCurrentStep(4)
  }

  const handleMicroZoneSelect = (zone) => {
    setCurrentWurf({ ...currentWurf, microZone: zone })
    setCurrentStep(5)
  }

  const handleOutcomeSelect = (outcome) => {
    onAddWurf({
      ...currentWurf,
      ergebnis: outcome
    })
    setCurrentWurf({
      wurfposition: null,
      gegenspieler: null,
      macroZone: null,
      microZone: null,
      ergebnis: null
    })
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex-1">
        {currentStep === 1 && (
          <ShotPositionStep onSelect={handlePositionSelect} />
        )}
        {currentStep === 2 && (
          <OpponentNumberStep onSelect={handleOpponentSelect} />
        )}
        {currentStep === 3 && (
          <GoalZoneMacroStep
            onSelect={handleMacroZoneSelect}
            selectedZone={currentWurf.macroZone}
          />
        )}
        {currentStep === 4 && (
          <GoalZoneMicroStep
            macroZone={currentWurf.macroZone}
            onSelect={handleMicroZoneSelect}
          />
        )}
        {currentStep === 5 && (
          <OutcomeStep onSelect={handleOutcomeSelect} />
        )}
      </div>

      {wurfe.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-4 max-h-64 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-blue-400">📋 Würfe ({wurfe.length})</h3>
            {onDeleteLast && (
              <button
                onClick={onDeleteLast}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-bold"
              >
                ↶ Undo
              </button>
            )}
          </div>
          <div className="space-y-2 text-sm">
            {wurfe.map((wurf, idx) => (
              <div key={wurf.id} className="bg-slate-700 p-2 rounded text-gray-300">
                <span className="font-bold text-blue-300">{idx + 1}.</span>
                {' '}{wurf.time} | {wurf.torwart} | #{wurf.gegenspieler} | {wurf.wurfposition} | {wurf.macroZone}-{wurf.microZone} | <span className="text-yellow-400">{wurf.ergebnis}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
