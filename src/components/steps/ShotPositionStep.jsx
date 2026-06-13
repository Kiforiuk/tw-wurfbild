export default function ShotPositionStep({ onSelect }) {
  const positions = [
    { label: 'LA', name: 'Links Außen' },
    { label: 'RL', name: 'Rechts Links' },
    { label: 'RM', name: 'Rechts Mitte' },
    { label: 'RR', name: 'Rechts Rechts' },
    { label: 'RA', name: 'Rechts Außen' },
    { label: 'KM', name: 'Kreis Mitte' },
    { label: '7m', name: '7-Meter' },
    { label: 'TG', name: 'Torwurf' }
  ]

  return (
    <div className="w-full flex flex-col items-center p-4" style={{ minHeight: 'auto' }}>
      <h2 className="text-4xl font-bold text-center text-blue-400" style={{ marginBottom: '4px' }}>
        📍 Wurfposition (Woher?)
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
        {positions.map((pos) => (
          <button
            key={pos.label}
            onClick={() => onSelect(pos.label)}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 p-8 rounded-xl text-center transition transform duration-75 touch-none"
          >
            <div className="text-5xl font-bold mb-2">{pos.label}</div>
            <div className="text-sm text-gray-200">{pos.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
