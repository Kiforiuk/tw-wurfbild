export default function GoalTargetMacroStep({ onSelect }) {
  const zones = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const getZoneLabel = (zone) => {
    const labels = {
      1: 'OL', // Oben Links
      2: 'OM', // Oben Mitte
      3: 'OR', // Oben Rechts
      4: 'ML', // Mitte Links
      5: 'MM', // Mitte Mitte
      6: 'MR', // Mitte Rechts
      7: 'UL', // Unten Links
      8: 'UM', // Unten Mitte
      9: 'UR', // Unten Rechts
    }
    return labels[zone]
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Tor - Grobe Zone (Wohin ungefähr?)</h2>

      <div className="w-full max-w-2xl aspect-video bg-gray-700 border-4 border-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 gap-1 h-full p-2">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => onSelect(zone)}
              className="bg-purple-600 hover:bg-purple-500 active:bg-purple-700 rounded font-bold text-xl md:text-2xl transition flex items-center justify-center"
            >
              {getZoneLabel(zone)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-gray-300 mt-6 text-center">Wähle die grobe Zone im Tor aus</p>
    </div>
  )
}
