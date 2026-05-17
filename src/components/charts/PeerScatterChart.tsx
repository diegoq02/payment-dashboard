import type { FC } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'
import { peerGroupInstitutions } from '../../data/mockPeerGroups'
import { useMemo } from 'react'

interface ScatterPoint {
  name: string;
  volatility: number;
  growth: number;
  marketShare: number;
  group: string;
  color: string;
  isAnomalous: boolean;
}

export const PeerScatterChart: FC = () => {
  const data: ScatterPoint[] = useMemo(() => {
    return peerGroupInstitutions.map(inst => {
      const metrics = inst.monthlyMetrics;
      const cceValues = metrics.map(m => m.transfersCce);
      
      // Calculate volatility (coefficient of variation)
      const avg = cceValues.reduce((a, b) => a + b, 0) / cceValues.length;
      const std = Math.sqrt(cceValues.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / cceValues.length);
      const volatility = std / avg;
      
      // Calculate growth (last 3 months vs first 3 months)
      const firstAvg = metrics.slice(0, 3).reduce((a, m) => a + m.transfersCce, 0) / 3;
      const lastAvg = metrics.slice(-3).reduce((a, m) => a + m.transfersCce, 0) / 3;
      const growth = ((lastAvg - firstAvg) / firstAvg) * 100;
      
      const isAnomalous = inst.anomalyScores.some(a => a.isAnomalous);
      
      return {
        name: inst.name,
        volatility: Math.round(volatility * 100) / 100,
        growth: Math.round(growth * 10) / 10,
        marketShare: (metrics[metrics.length - 1].totalOps / peerGroupInstitutions.reduce((s, p) => s + p.monthlyMetrics[p.monthlyMetrics.length - 1].totalOps, 0)) * 100,
        group: inst.group,
        color: inst.color,
        isAnomalous,
      };
    });
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Análisis Peer-to-Peer</h3>
        <p className="text-sm text-gray-500 mt-1">Volatilidad vs. Crecimiento por Institución</p>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              type="number" 
              dataKey="volatility" 
              name="Volatilidad" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              label={{ value: 'Volatilidad (coef. de variación)', position: 'bottom', offset: 0, style: { fontSize: 12, fill: '#94a3b8' } }}
            />
            <YAxis 
              type="number" 
              dataKey="growth" 
              name="Crecimiento (%)"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              label={{ value: 'Crecimiento YoY (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#94a3b8' } }}
            />
            <ReferenceLine x={0} stroke="#e2e8f0" />
            <ReferenceLine y={0} stroke="#e2e8f0" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: any) => {
                if (typeof value === 'number') {
                  return [value.toFixed(2), '']
                }
                return [String(value), '']
              }}
            />
            <Scatter data={data}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isAnomalous ? '#EF4444' : entry.color}
                  stroke={entry.isAnomalous ? '#EF4444' : entry.color}
                  strokeWidth={entry.isAnomalous ? 3 : 1}
                  r={entry.marketShare * 2}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}