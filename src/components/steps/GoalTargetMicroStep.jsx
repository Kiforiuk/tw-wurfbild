const MACRO_LABELS = {
  1: 'Oben Links',
  2: 'Oben Mitte',
  3: 'Oben Rechts',
  4: 'Mitte Links',
  5: 'Mitte Mitte',
  6: 'Mitte Rechts',
  7: 'Unten Links',
  8: 'Unten Mitte',
  9: 'Unten Rechts',
}

export default function GoalTargetMicroStep({ selectedMacro, onSelect }) {
  const zones = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Tor - Feine Zone (Wohin genau?)</h2>
      <p className="text-xl md:text-2xl text-gray-300 mb-8">
        Zoomed in: <span className="font-bold text-yellow-400">{MACRO_LABELS[selectedMacro]}</span>
      </p>

      <div className="w-full max-w-2xl aspect-video bg-gray-700 border-4 border-yellow-400 rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 gap-1 h-full p-2">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => onSelect(zone)}
              className="bg-orange-600 hover:bg-orange-500 active:bg-orange-700 rounded font-bold text-2xl md:text-3xl transition flex items-center justify-center"
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      <p className="text-gray-300 mt-6 text-center">Wähle das exakte Feld aus</p>
    </div>
  )
}
