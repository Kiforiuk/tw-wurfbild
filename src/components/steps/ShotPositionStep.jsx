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

      {/* Layout with images on sides */}
      <div className="flex items-center justify-between w-full flex-wrap md:flex-nowrap px-2">
        {/* Left Image */}
        <div className="hidden md:block w-80 flex-shrink-0">
          <img
            src="/images/image1.png"
            alt="Handball Links"
            className="w-full h-auto rounded-lg opacity-80 hover:opacity-100 transition shadow-lg"
          />
        </div>

        {/* Center: Buttons Grid */}
        <div className="flex-1 min-w-[300px] px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {positions.map((pos) => (
              <button
                key={pos.label}
                onClick={() => onSelect(pos.label)}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 p-8 rounded-xl transition transform duration-75 touch-none flex flex-col items-center justify-center min-h-[180px]"
              >
                <div className="text-5xl font-bold text-white leading-tight">{pos.label}</div>
                <div className="text-sm text-gray-200 mt-3 text-center leading-snug">{pos.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:block w-80 flex-shrink-0">
          <img
            src="/images/image2.png"
            alt="Handball Rechts"
            className="w-full h-auto rounded-lg opacity-80 hover:opacity-100 transition shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
