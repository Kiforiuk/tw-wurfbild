import { useState, useRef } from 'react'
import { Delete } from 'lucide-react'

export default function OpponentNumberStep({ onSelect }) {
  const [digit1, setDigit1] = useState('')
  const [digit2, setDigit2] = useState('')
  const digit2Ref = useRef(null)

  const handleDigit1Click = (digit) => {
    if (digit1 === '') {
      setDigit1(digit)
      // Auto-focus to digit2 after a brief delay
      setTimeout(() => digit2Ref.current?.focus(), 100)
    }
  }

  const handleDigit2Click = (digit) => {
    if (digit2 === '') {
      const newNumber = digit1 + digit
      // Auto-submit after 2 digits complete
      onSelect(parseInt(newNumber))
    }
  }

  const handleBackspace = () => {
    if (digit2 !== '') {
      setDigit2('')
    } else if (digit1 !== '') {
      setDigit1('')
    }
  }

  const handleKeyPress = (e, isDigit2) => {
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault()
      if (isDigit2) {
        handleDigit2Click(e.key)
      } else {
        handleDigit1Click(e.key)
      }
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      handleBackspace()
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Gegenspieler (Wer?)</h2>

      {/* Display as two separate digit inputs */}
      <div className="flex gap-6 mb-12 justify-center">
        {/* Digit 1 */}
        <input
          type="text"
          inputMode="numeric"
          value={digit1}
          onChange={() => {}}
          onKeyDown={(e) => handleKeyPress(e, false)}
          placeholder="0"
          className="w-20 h-20 text-6xl text-center font-bold bg-gray-700 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-blue-300"
          readOnly
        />

        {/* Digit 2 */}
        <input
          ref={digit2Ref}
          type="text"
          inputMode="numeric"
          value={digit2}
          onChange={() => {}}
          onKeyDown={(e) => handleKeyPress(e, true)}
          placeholder="0"
          className="w-20 h-20 text-6xl text-center font-bold bg-gray-700 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-300"
          readOnly
        />
      </div>

      {/* Numpad Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm w-full px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            key={digit}
            onClick={() => digit2 === '' ? handleDigit1Click(digit.toString()) : handleDigit2Click(digit.toString())}
            className="aspect-square text-4xl md:text-5xl font-bold bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition touch-target"
          >
            {digit}
          </button>
        ))}

        {/* 0 Button */}
        <button
          onClick={() => digit2 === '' ? handleDigit1Click('0') : handleDigit2Click('0')}
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

      {/* Info */}
      <div className="text-gray-400 text-sm mt-6">
        Erste Ziffer → zweite Ziffer → automatisch OK ✓
      </div>

      <style jsx>{`
        .touch-target {
          min-height: 80px;
        }
      `}</style>
    </div>
  )
}
