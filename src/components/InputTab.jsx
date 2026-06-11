import { useState } from 'react'
import ShotPositionStep from './steps/ShotPositionStep'
import OpponentNumberStep from './steps/OpponentNumberStep'
import GoalZoneMacroStep from './steps/GoalZoneMacroStep'
import GoalZoneMicroStep from './steps/GoalZoneMicroStep'
import OutcomeStep from './steps/OutcomeStep'

export default function InputTab({ onAddWurf, currentStep, setCurrentStep }) {
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
    <div className="w-full">
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
  )
}
