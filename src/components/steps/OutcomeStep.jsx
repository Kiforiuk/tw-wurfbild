export default function OutcomeStep({ onSelect }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ergebnis (Was ist passiert?)</h2>

      <div className="w-full max-w-2xl space-y-4">
        <button
          onClick={() => onSelect('Tor')}
          className="w-full py-6 md:py-8 text-3xl md:text-4xl font-bold bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg transition touch-target"
        >
          TOR 🎯
        </button>

        <button
          onClick={() => onSelect('Gehalten')}
          className="w-full py-6 md:py-8 text-3xl md:text-4xl font-bold bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition touch-target"
        >
          GEHALTEN ✋
        </button>

        <button
          onClick={() => onSelect('Vorbei/Block')}
          className="w-full py-6 md:py-8 text-3xl md:text-4xl font-bold bg-gray-600 hover:bg-gray-700 active:bg-gray-800 rounded-lg transition touch-target"
        >
          VORBEI / BLOCK ❌
        </button>
      </div>

      <style jsx>{`
        .touch-target {
          min-height: 100px;
        }
      `}</style>
    </div>
  )
}
