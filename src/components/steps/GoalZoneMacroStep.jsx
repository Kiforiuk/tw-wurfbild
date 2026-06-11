export default function GoalZoneMacroStep({ onSelect }) {
  const zoneNames = [
    ['Oben Links', 'Oben Mitte', 'Oben Rechts'],
    ['Mitte Links', 'Mitte Mitte', 'Mitte Rechts'],
    ['Unten Links', 'Unten Mitte', 'Unten Rechts']
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-400">
        🎯 Wurfeck Grob (Macro Zone)
      </h2>

      <div className="grid grid-cols-3 gap-4 max-w-md w-full aspect-square">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const zoneNum = i + 1
          const zoneName = zoneNames[row][col]

          return (
            <button
              key={i}
              onClick={() => onSelect(zoneNum)}
              className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 p-6 rounded-lg text-center transition transform active:scale-95 touch-none flex flex-col items-center justify-center"
            >
              <div className="text-3xl font-bold mb-2">{zoneNum}</div>
              <div className="text-xs text-gray-200">{zoneName}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
