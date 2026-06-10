import { useState } from 'react'

export default function StatisticsTab({ shots }) {
  const [selectedPlayer, setSelectedPlayer] = useState('')

  // Get unique player numbers
  const uniquePlayers = [...new Set(shots.map(s => s.opponentNumber))].sort((a, b) => a - b)

  // Filter shots for selected player
  const playerShots = selectedPlayer ? shots.filter(s => s.opponentNumber === parseInt(selectedPlayer)) : []

  // Calculate statistics
  const calculateStats = () => {
    if (playerShots.length === 0) return null

    const goals = playerShots.filter(s => s.outcome === 'Tor').length
    const saved = playerShots.filter(s => s.outcome === 'Gehalten').length
    const missed = playerShots.filter(s => s.outcome === 'Vorbei/Block').length
    const successRate = ((goals / playerShots.length) * 100).toFixed(1)

    return { goals, saved, missed, successRate, total: playerShots.length }
  }

  // Calculate heat-map data (81 fields: 9x9)
  const calculateHeatMap = () => {
    const heatMap = {}

    playerShots.forEach(shot => {
      const key = `${shot.goalTargetMacro}-${shot.goalTargetMicro}`
      heatMap[key] = (heatMap[key] || 0) + 1
    })

    return heatMap
  }

  // Get color based on shot count
  const getColor = (count) => {
    if (count === 0) return 'bg-gray-700'
    if (count <= 3) return 'bg-blue-700'
    if (count <= 6) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  const stats = calculateStats()
  const heatMap = calculateHeatMap()

  const zoneLabels = {
    1: 'OL', 2: 'OM', 3: 'OR',
    4: 'ML', 5: 'MM', 6: 'MR',
    7: 'UL', 8: 'UM', 9: 'UR'
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">📊 Statistik nach Werfer</h2>

      {shots.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-400">Keine Daten vorhanden. Starten Sie mit der Datenerfassung!</p>
        </div>
      ) : (
        <>
          {/* Player Selector */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Werfer wählen:</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full md:w-64 px-6 py-3 bg-gray-700 border border-gray-600 rounded text-white text-lg font-semibold"
            >
              <option value="">-- Bitte wählen --</option>
              {uniquePlayers.map(player => (
                <option key={player} value={player}>
                  Werfer #{player}
                </option>
              ))}
            </select>
          </div>

          {/* Statistics Display */}
          {selectedPlayer && stats && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-900 border border-blue-700 rounded-lg p-6 text-center">
                  <p className="text-gray-300 text-sm font-semibold mb-2">WÜRFE GESAMT</p>
                  <p className="text-4xl font-bold text-blue-400">{stats.total}</p>
                </div>

                <div className="bg-green-900 border border-green-700 rounded-lg p-6 text-center">
                  <p className="text-gray-300 text-sm font-semibold mb-2">TORE</p>
                  <p className="text-4xl font-bold text-green-400">{stats.goals}</p>
                </div>

                <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-6 text-center">
                  <p className="text-gray-300 text-sm font-semibold mb-2">GEHALTEN</p>
                  <p className="text-4xl font-bold text-yellow-400">{stats.saved}</p>
                </div>

                <div className="bg-red-900 border border-red-700 rounded-lg p-6 text-center">
                  <p className="text-gray-300 text-sm font-semibold mb-2">ERFOLGSQUOTE</p>
                  <p className="text-4xl font-bold text-red-400">{stats.successRate}%</p>
                </div>
              </div>

              {/* Heat-Map: 9x9 Grid showing all 81 fields */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold mb-6">🔥 Schuss-Heatmap (Alle 81 Zonen)</h3>

                <div className="mb-4 flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-700 border border-gray-600"></div>
                    <span>0 Schüsse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-700 border border-gray-600"></div>
                    <span>1-3 Schüsse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-600 border border-gray-600"></div>
                    <span>4-6 Schüsse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-600 border border-gray-600"></div>
                    <span>7+ Schüsse</span>
                  </div>
                </div>

                {/* 3x3 Grid of 3x3 Grids = 9x9 */}
                <div className="inline-grid gap-1 p-4 bg-gray-900 rounded-lg">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(macroZone => (
                    <div key={macroZone} className="flex gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(microZone => {
                        const key = `${macroZone}-${microZone}`
                        const count = heatMap[key] || 0
                        const color = getColor(count)

                        return (
                          <div
                            key={key}
                            className={`w-12 h-12 flex items-center justify-center rounded border border-gray-600 font-bold text-white text-sm ${color} cursor-pointer transition hover:opacity-80`}
                            title={`Zone ${macroZone}-${microZone}: ${count} Schüsse`}
                          >
                            {count > 0 ? count : '-'}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>

                <p className="text-gray-400 text-sm mt-4">
                  Jedes Feld zeigt eine grobe Zone (1-9) × feine Zone (1-9). Farben basieren auf Schusshäufigkeit.
                </p>
              </div>

              {/* Detailed Shots Table */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 overflow-x-auto mb-8">
                <h3 className="text-xl font-bold mb-4">Alle Würfe von Werfer #{selectedPlayer}</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left font-semibold text-blue-400">Zeit</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-400">HZ</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-400">TW</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-400">Position</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-400">Tor Grob</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-400">Tor Fein</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-400">Ergebnis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerShots.map((shot, idx) => (
                      <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700 transition">
                        <td className="px-4 py-3">{shot.timestamp}</td>
                        <td className="px-4 py-3">{shot.matchTime}</td>
                        <td className="px-4 py-3">TW {shot.goalie}</td>
                        <td className="px-4 py-3">{shot.shotPosition}</td>
                        <td className="px-4 py-3">
                          <span className="bg-gray-700 px-2 py-1 rounded text-xs">{zoneLabels[shot.goalTargetMacro]}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-gray-700 px-2 py-1 rounded text-xs">{shot.goalTargetMicro}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded font-semibold text-xs ${
                              shot.outcome === 'Tor'
                                ? 'bg-green-700 text-green-200'
                                : shot.outcome === 'Gehalten'
                                ? 'bg-yellow-700 text-yellow-200'
                                : 'bg-red-700 text-red-200'
                            }`}
                          >
                            {shot.outcome}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Statistics Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <p className="text-gray-400 text-sm mb-2">Nach Position</p>
                  <div className="space-y-2">
                    {[...new Set(playerShots.map(s => s.shotPosition))].map(pos => {
                      const posShots = playerShots.filter(s => s.shotPosition === pos)
                      const posGoals = posShots.filter(s => s.outcome === 'Tor').length
                      return (
                        <div key={pos} className="flex justify-between text-sm">
                          <span className="font-semibold">{pos}:</span>
                          <span>{posGoals}/{posShots.length}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <p className="text-gray-400 text-sm mb-2">Nach Tor-Zone (Grob)</p>
                  <div className="space-y-2">
                    {[...new Set(playerShots.map(s => s.goalTargetMacro))].sort((a, b) => a - b).map(zone => {
                      const zoneShots = playerShots.filter(s => s.goalTargetMacro === zone)
                      const zoneGoals = zoneShots.filter(s => s.outcome === 'Tor').length
                      return (
                        <div key={zone} className="flex justify-between text-sm">
                          <span className="font-semibold">{zoneLabels[zone]}:</span>
                          <span>{zoneGoals}/{zoneShots.length}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <p className="text-gray-400 text-sm mb-2">Nach Ergebnis</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-green-400">Tore:</span>
                      <span>{stats.goals} ({((stats.goals / stats.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-yellow-400">Gehalten:</span>
                      <span>{stats.saved} ({((stats.saved / stats.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-red-400">Vorbei/Block:</span>
                      <span>{stats.missed} ({((stats.missed / stats.total) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
