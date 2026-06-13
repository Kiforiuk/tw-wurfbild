import { useState, useMemo } from 'react'

export default function StatisticsTab({ wurfe }) {
  const [selectedGegenspieler, setSelectedGegenspieler] = useState(null)
  const [zoomedMacroZone, setZoomedMacroZone] = useState(null)

  const gegenspielerList = useMemo(() => {
    const unique = new Set(wurfe.map(w => w.gegenspieler))
    return Array.from(unique).sort((a, b) => a - b)
  }, [wurfe])

  const selectedWurfe = useMemo(() => {
    if (!selectedGegenspieler) return []
    return wurfe.filter(w => w.gegenspieler === selectedGegenspieler)
  }, [wurfe, selectedGegenspieler])

  const heatmapData = useMemo(() => {
    if (!selectedGegenspieler) return {}

    const data = {}
    for (let i = 1; i <= 9; i++) {
      data[i] = { count: 0, tore: 0 }
    }

    selectedWurfe.forEach(w => {
      if (data[w.macroZone]) {
        data[w.macroZone].count++
        if (w.ergebnis === 'tor') data[w.macroZone].tore++
      }
    })

    return data
  }, [selectedWurfe])

  const microZoneData = useMemo(() => {
    if (!zoomedMacroZone) return {}

    const data = {}
    for (let i = 1; i <= 9; i++) {
      data[i] = { count: 0, tore: 0 }
    }

    selectedWurfe
      .filter(w => w.macroZone === zoomedMacroZone)
      .forEach(w => {
        if (data[w.microZone]) {
          data[w.microZone].count++
          if (w.ergebnis === 'tor') data[w.microZone].tore++
        }
      })

    return data
  }, [selectedWurfe, zoomedMacroZone])

  const getHeatmapColor = (count) => {
    if (count === 0) return 'bg-green-900'
    if (count <= 3) return 'bg-yellow-700'
    return 'bg-red-700'
  }

  const stats = useMemo(() => {
    if (!selectedWurfe.length) return null

    const tore = selectedWurfe.filter(w => w.ergebnis === 'tor').length
    const gehalten = selectedWurfe.filter(w => w.ergebnis === 'gehalten').length
    const vorbei = selectedWurfe.filter(w => w.ergebnis === 'vorbei').length
    const quote = (tore / selectedWurfe.length * 100).toFixed(1)

    return { tore, gehalten, vorbei, quote, total: selectedWurfe.length }
  }, [selectedWurfe])

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-blue-400">📊 Statistik-Auswertung</h2>

      {gegenspielerList.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg text-center text-xl text-gray-400">
          Noch keine Daten erfasst
        </div>
      ) : (
        <>
          <div className="mb-8">
            <label className="block text-lg font-bold mb-4">Gegenspieler wählen:</label>
            <select
              value={selectedGegenspieler || ''}
              onChange={(e) => setSelectedGegenspieler(e.target.value ? parseInt(e.target.value) : null)}
              className="bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg font-bold text-lg cursor-pointer w-full md:w-64"
            >
              <option value="">-- Wählen --</option>
              {gegenspielerList.map(num => (
                <option key={num} value={num}>
                  #{num}
                </option>
              ))}
            </select>
          </div>

          {selectedGegenspieler && stats && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="text-gray-400 text-sm font-bold">WÜRFE GESAMT</div>
                  <div className="text-4xl font-bold text-blue-400">{stats.total}</div>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                  <div className="text-gray-400 text-sm font-bold">TORE</div>
                  <div className="text-4xl font-bold text-red-400">{stats.tore}</div>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                  <div className="text-gray-400 text-sm font-bold">GEHALTEN</div>
                  <div className="text-4xl font-bold text-green-400">{stats.gehalten}</div>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-yellow-500">
                  <div className="text-gray-400 text-sm font-bold">ERFOLGSQUOTE</div>
                  <div className="text-4xl font-bold text-yellow-400">{stats.quote}%</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 text-blue-400">
                {zoomedMacroZone ? `🔍 Makro-Zone ${zoomedMacroZone} (Mikro-Zonen)` : '🎯 Wurfzonen-Heatmap (Makro-Zonen)'}
              </h3>
              <div className="bg-slate-800 p-8 rounded-lg mb-8">
                {zoomedMacroZone && (
                  <button
                    onClick={() => setZoomedMacroZone(null)}
                    className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold text-sm"
                  >
                    ← Zurück zu Makro-Zonen
                  </button>
                )}

                {/* Heatmap Grid */}
                <div className="grid grid-cols-3 gap-3 max-w-md">
                      {Array.from({ length: 9 }, (_, i) => {
                        const zone = i + 1
                        const data = zoomedMacroZone ? microZoneData[zone] : heatmapData[zone]
                        const color = getHeatmapColor(data.count)
                        const isClickable = !zoomedMacroZone && heatmapData[zone].count > 0

                        return (
                          <div
                            key={i}
                            onClick={() => {
                              if (isClickable) setZoomedMacroZone(zone)
                            }}
                            className={`${color} p-6 rounded-lg text-center border border-slate-600 transition ${
                              isClickable ? 'cursor-pointer hover:border-blue-400 hover:scale-105' : ''
                            }`}
                          >
                            <div className="text-sm text-gray-200">
                              {zoomedMacroZone ? `Mikro ${zone}` : `Zone ${zone}`}
                            </div>
                            <div className="text-2xl font-bold text-white">{data.count}</div>
                            <div className="text-xs text-gray-300">
                              {data.tore}/{data.count} Tore
                            </div>
                          </div>
                        )
                      })}
                </div>

                <div className="mt-6 flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-900 rounded"></div>
                    <span>0 Würfe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-700 rounded"></div>
                    <span>1-3 Würfe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-700 rounded"></div>
                    <span>4+ Würfe</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                {zoomedMacroZone ? `📋 Würfe in Makro-Zone ${zoomedMacroZone}` : '📋 Alle Würfe'}
              </h3>
              <div className="overflow-x-auto bg-slate-800 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-900">
                      <th className="p-4 text-left">Zeit</th>
                      <th className="p-4 text-left">TW</th>
                      <th className="p-4 text-left">Position</th>
                      <th className="p-4 text-left">Grob</th>
                      <th className="p-4 text-left">Fein</th>
                      <th className="p-4 text-left">Ergebnis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedWurfe
                      .filter(w => !zoomedMacroZone || w.macroZone === zoomedMacroZone)
                      .map(w => (
                        <tr key={w.id} className="border-b border-slate-700 hover:bg-slate-700">
                          <td className="p-4">{w.time}</td>
                          <td className="p-4">{w.torwart}</td>
                          <td className="p-4">{w.wurfposition}</td>
                          <td className="p-4">{w.macroZone}</td>
                          <td className="p-4">{w.microZone}</td>
                          <td className="p-4">
                            {w.ergebnis === 'tor' && '🎯 TOR'}
                            {w.ergebnis === 'gehalten' && '✋ GEHALTEN'}
                            {w.ergebnis === 'vorbei' && '❌ VORBEI'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
