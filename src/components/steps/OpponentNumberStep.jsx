import { useState, useEffect } from 'react'

export default function OpponentNumberStep({ onSelect }) {
  const [digits, setDigits] = useState('')

  useEffect(() => {
    if (digits.length === 2) {
      const number = parseInt(digits)
      onSelect(number)
      setDigits('')
    }
  }, [digits, onSelect])

  const handleDigit = (digit) => {
    if (digits.length < 2) {
      const newDigits = digits + digit
      setDigits(newDigits)
    }
  }

  const handleBackspace = () => {
    setDigits(digits.slice(0, -1))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">
        🔢 Gegenspieler (Trikotnummer)
      </h2>
      <p className="text-xl text-gray-300 mb-12 text-center">
        Gib genau ZWEI Ziffern ein
      </p>

      <div className="bg-slate-800 border-2 border-blue-500 px-12 py-8 rounded-2xl text-6xl font-mono font-bold mb-12 min-w-[300px] text-center">
        {digits || '_ _'}
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-md w-full mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(String(num))}
            disabled={digits.length >= 2}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed p-8 rounded-xl text-4xl font-bold transition touch-none"
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex gap-4 max-w-md w-full">
        <button
          onClick={() => handleDigit('0')}
          disabled={digits.length >= 2}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed p-8 rounded-xl text-4xl font-bold transition touch-none"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="flex-1 bg-red-600 hover:bg-red-700 p-8 rounded-xl text-xl font-bold transition touch-none"
        >
          ⌫ Löschen
        </button>
      </div>
    </div>
  )
}
