export default function OutcomeStep({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-400">
        ⚽ Ergebnis (Was ist passiert?)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <button
          onClick={() => onSelect('tor')}
          className="bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 p-12 rounded-2xl text-center transition transform active:scale-95 touch-none"
        >
          <div className="text-6xl mb-4">🎯</div>
          <div className="text-3xl font-bold">TOR</div>
        </button>

        <button
          onClick={() => onSelect('gehalten')}
          className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 p-12 rounded-2xl text-center transition transform active:scale-95 touch-none"
        >
          <div className="text-6xl mb-4">✋</div>
          <div className="text-3xl font-bold">GEHALTEN</div>
        </button>

        <button
          onClick={() => onSelect('vorbei')}
          className="bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 p-12 rounded-2xl text-center transition transform active:scale-95 touch-none"
        >
          <div className="text-6xl mb-4">❌</div>
          <div className="text-3xl font-bold">VORBEI</div>
        </button>
      </div>
    </div>
  )
}
