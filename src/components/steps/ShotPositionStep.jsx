const POSITIONS = ['LA', 'RL', 'RM', 'RR', 'RA', 'KM', '7m', 'TG']

export default function ShotPositionStep({ onSelect }) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Wurfposition (Woher?)</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full px-4">
        {POSITIONS.map((position) => (
          <button
            key={position}
            onClick={() => onSelect(position)}
            className="aspect-square text-3xl md:text-4xl font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition touch-target"
          >
            {position}
          </button>
        ))}
      </div>

      <style jsx>{`
        .touch-target {
          min-height: 100px;
        }
      `}</style>
    </div>
  )
}
