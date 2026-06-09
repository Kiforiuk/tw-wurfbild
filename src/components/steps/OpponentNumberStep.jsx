import { useState } from 'react'
import { Delete } from 'lucide-react'

export default function OpponentNumberStep({ onSelect }) {
  const [number, setNumber] = useState('')

  const handleDigitClick = (digit) => {
    setNumber(number + digit)
  }

  const handleBackspace = () => {
    setNumber(number.slice(0, -1))
  }

  const handleConfirm = () => {
    if (number.length > 0) {
      onSelect(parseInt(number))
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Gegenspieler (Wer?)</h2>

      {/* Display */}
      <div className="text-6xl md:text-7xl font-bold mb-12 h-20 flex items-center">
        {number || '0'}
      </div>

      {/* Numpad Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm w-full px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            key={digit}
            onClick={() => handleDigitClick(digit.toString())}
            className="aspect-square text-4xl md:text-5xl font-bold bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition touch-target"
          >
            {digit}
          </button>
        ))}

        {/* 0 Button */}
        <button
          onClick={() => handleDigitClick('0')}
          className="col-span-2 aspect-square text-4xl md:text-5xl font-bold bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition touch-target"
        >
          0
        </button>

        {/* Backspace Button */}
        <button
          onClick={handleBackspace}
          className="aspect-square flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 rounded-lg transition touch-target"
        >
          <Delete size={32} />
        </button>
      </div>

      {/* OK Button */}
      <button
        onClick={handleConfirm}
        disabled={number.length === 0}
        className="w-full max-w-sm px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-bold text-2xl transition touch-target"
      >
        OK
      </button>

      <style jsx>{`
        .touch-target {
          min-height: 80px;
        }
      `}</style>
    </div>
  )
}
