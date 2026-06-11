export default function GoalZoneMicroStep({ macroZone, onSelect }) {
  const macroNames = {
    1: 'Oben Links',
    2: 'Oben Mitte',
    3: 'Oben Rechts',
    4: 'Mitte Links',
    5: 'Mitte Mitte',
    6: 'Mitte Rechts',
    7: 'Unten Links',
    8: 'Unten Mitte',
    9: 'Unten Rechts'
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-400">
        🔍 Wurfeck Fein (Micro Zone)
      </h2>
      <p className="text-xl text-gray-400 mb-12 text-center">
        Zoomed in: {macroNames[macroZone]}
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-md w-full aspect-square">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i + 1)}
            className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 p-6 rounded-lg text-center transition transform active:scale-95 touch-none flex items-center justify-center"
          >
            <div className="text-3xl font-bold">{i + 1}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
