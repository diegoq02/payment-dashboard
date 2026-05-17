import type { FC } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useMemo } from 'react'
import { peerGroupInstitutions } from '../../data/mockPeerGroups'

interface PeerRadarChartProps {
  institutionId: string;
  peerGroupIds: string[];
}

export const PeerRadarChart: FC<PeerRadarChartProps> = ({ institutionId, peerGroupIds }) => {
  const data = useMemo(() => {
    const institution = peerGroupInstitutions.find(i => i.id === institutionId);
    if (!institution) return [];

    const peers = peerGroupInstitutions.filter(i => peerGroupIds.includes(i.id));
    const allMetrics = [...peers, institution];

    const avgCce = allMetrics.reduce((sum, i) => sum + i.monthlyMetrics.reduce((s, m) => s + m.transfersCce, 0) / i.monthlyMetrics.length, 0) / allMetrics.length;
    const avgDigital = allMetrics.reduce((sum, i) => sum + i.monthlyMetrics.reduce((s, m) => s + m.digitalShare, 0) / i.monthlyMetrics.length, 0) / allMetrics.length;
    const avgGrowth = allMetrics.reduce((sum, i) => {
      const metrics = i.monthlyMetrics;
      const firstAvg = metrics.slice(0, 3).reduce((a, m) => a + m.transfersCce, 0) / 3;
      const lastAvg = metrics.slice(-3).reduce((a, m) => a + m.transfersCce, 0) / 3;
      return sum + ((lastAvg - firstAvg) / firstAvg) * 100;
    }, 0) / allMetrics.length;
    const avgTicket = allMetrics.reduce((sum, i) => sum + i.monthlyMetrics.reduce((s, m) => s + m.avgTicket, 0) / i.monthlyMetrics.length, 0) / allMetrics.length;
    const avgOps = allMetrics.reduce((sum, i) => sum + i.monthlyMetrics.reduce((s, m) => s + m.totalOps, 0) / i.monthlyMetrics.length, 0) / allMetrics.length;
    const avgImmediate = allMetrics.reduce((sum, i) => sum + i.monthlyMetrics.reduce((s, m) => s + m.transfersImmediate, 0) / i.monthlyMetrics.length, 0) / allMetrics.length;

    const instMetrics = institution.monthlyMetrics;
    const instAvgCce = instMetrics.reduce((s, m) => s + m.transfersCce, 0) / instMetrics.length;
    const instAvgDigital = instMetrics.reduce((s, m) => s + m.digitalShare, 0) / instMetrics.length;
    const instFirstAvg = instMetrics.slice(0, 3).reduce((a, m) => a + m.transfersCce, 0) / 3;
    const instLastAvg = instMetrics.slice(-3).reduce((a, m) => a + m.transfersCce, 0) / 3;
    const instAvgGrowth = ((instLastAvg - instFirstAvg) / instFirstAvg) * 100;
    const instAvgTicket = instMetrics.reduce((s, m) => s + m.avgTicket, 0) / instMetrics.length;
    const instAvgOps = instMetrics.reduce((s, m) => s + m.totalOps, 0) / instMetrics.length;
    const instAvgImmediate = instMetrics.reduce((s, m) => s + m.transfersImmediate, 0) / instMetrics.length;

    return [
      { subject: 'CCE', A: (instAvgCce / avgCce) * 100, B: 100, fullMark: 200 },
      { subject: 'Digital', A: (instAvgDigital / avgDigital) * 100, B: 100, fullMark: 200 },
      { subject: 'Crecimiento', A: (instAvgGrowth / avgGrowth) * 100, B: 100, fullMark: 200 },
      { subject: 'Ticket', A: (instAvgTicket / avgTicket) * 100, B: 100, fullMark: 200 },
      { subject: 'Operaciones', A: (instAvgOps / avgOps) * 100, B: 100, fullMark: 200 },
      { subject: 'Inmediato', A: (instAvgImmediate / avgImmediate) * 100, B: 100, fullMark: 200 },
    ];
  }, [institutionId, peerGroupIds]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Fingerprint de Institución</h3>
        <p className="text-sm text-gray-500 mt-1">Comparación vs. Promedio del Peer Group</p>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <PolarRadiusAxis tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 200]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Radar
              name={peerGroupInstitutions.find(i => i.id === institutionId)?.name || 'Institución'}
              dataKey="A"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="Promedio Peer Group"
              dataKey="B"
              stroke="#94A3B8"
              fill="transparent"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}