import type { FC } from 'react'
import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { peerGroupInstitutions } from '../../data/mockPeerGroups'
import { useMemo } from 'react'

interface ZScoreChartProps {
  institutionId: string;
  peerGroupIds: string[];
}

export const ZScoreChart: FC<ZScoreChartProps> = ({ institutionId, peerGroupIds }) => {
  const [selectedMetric, setSelectedMetric] = useState<'cce' | 'digital'>('cce')

  const data = useMemo(() => {
    const institution = peerGroupInstitutions.find(i => i.id === institutionId)
    if (!institution) return []

    const peers = peerGroupInstitutions.filter(i => peerGroupIds.includes(i.id))

    return institution.monthlyMetrics.map((m, index) => {
      const zCce = (m.transfersCce - (peers.reduce((sum, p) => sum + p.monthlyMetrics[index].transfersCce, 0) / peers.length)) / 
        Math.sqrt(peers.reduce((sum, p) => sum + Math.pow(p.monthlyMetrics[index].transfersCce - (peers.reduce((s, p) => s + p.monthlyMetrics[index].transfersCce, 0) / peers.length), 2), 0) / peers.length)
      
      const zDigital = ((m.yape + m.plin) - (peers.reduce((sum, p) => sum + (p.monthlyMetrics[index].yape + p.monthlyMetrics[index].plin), 0) / peers.length)) / 
        Math.sqrt(peers.reduce((sum, p) => sum + Math.pow((p.monthlyMetrics[index].yape + p.monthlyMetrics[index].plin) - (peers.reduce((s, p) => s + (p.monthlyMetrics[index].yape + p.monthlyMetrics[index].plin), 0) / peers.length), 2), 0) / peers.length)

      return {
        month: m.month,
        date: m.date,
        zScoreCce: Math.round(zCce * 100) / 100,
        zScoreDigital: Math.round(zDigital * 100) / 100,
        isAnomalous: Math.abs(zCce) > 2.5 || Math.abs(zDigital) > 2.5,
      }
    })
  }, [institutionId, peerGroupIds])

  if (data.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Z-Score Timeline</h3>
          <p className="text-sm text-gray-500 mt-1">Desviación estándar vs. Peer Group</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedMetric('cce')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              selectedMetric === 'cce'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            CCE
          </button>
          <button
            onClick={() => setSelectedMetric('digital')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              selectedMetric === 'digital'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Digital
          </button>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-zscore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              domain={[-4, 4]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: any) => {
                if (typeof value === 'number') {
                  return [`${value.toFixed(2)}σ`, 'Z-Score']
                }
                return [String(value), '']
              }}
            />
            <ReferenceLine y={0} stroke="#e2e8f0" />
            <ReferenceLine y={1.5} stroke="#F59E0B" strokeDasharray="3 3" label="Watchlist" />
            <ReferenceLine y={-1.5} stroke="#F59E0B" strokeDasharray="3 3" />
            <ReferenceLine y={2.5} stroke="#EF4444" strokeDasharray="5 5" label="Anomaly" />
            <ReferenceLine y={-2.5} stroke="#EF4444" strokeDasharray="5 5" />
            <Area
              type="monotone"
              dataKey={selectedMetric === 'cce' ? 'zScoreCce' : 'zScoreDigital'}
              stroke="#2563EB"
              fill="url(#grad-zscore)"
              strokeWidth={2}
              dot={(props: any) => {
                if (props.payload.isAnomalous) {
                  return <circle cx={props.cx} cy={props.cy} r={4} fill="#EF4444" stroke="#EF4444" />
                }
                return <circle cx={props.cx} cy={props.cy} r={2} fill="#2563EB" />
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}