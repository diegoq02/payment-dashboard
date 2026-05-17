import type { FC } from 'react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Trophy, AlertTriangle, Building2 } from 'lucide-react'
import { institutionsData } from '../data/mockPayments'
import { peerGroupInstitutions } from '../data/mockPeerGroups'
import { PeerScatterChart } from '../components/charts/PeerScatterChart'
import { PeerRadarChart } from '../components/charts/PeerRadarChart'
import { ZScoreChart } from '../components/charts/ZScoreChart'
import { AlertStream } from '../components/shared/AlertStream'
import { useMemo } from 'react'

export const InstitutionsPage: FC = () => {
  const [selectedInstitution, setSelectedInstitution] = useState('bcp')
  const [selectedPeerGroup] = useState(['bbva', 'interbank', 'scotiabank', 'banbif'])
  
  // Predefined peer groups
  const peerGroups = useMemo(() => ({
    'bancos-comerciales': peerGroupInstitutions.filter(i => i.sector === 'commercial').map(i => i.id),
    'mic': peerGroupInstitutions.filter(i => i.group === 'mfi').map(i => i.id),
    'cooperativas': peerGroupInstitutions.filter(i => i.group === 'coop').map(i => i.id),
    'digitales': peerGroupInstitutions.filter(i => i.group === 'wallet').map(i => i.id),
    'custom': selectedPeerGroup,
  }), [selectedPeerGroup])

  const [activeGroup, setActiveGroup] = useState<keyof typeof peerGroups>('bancos-comerciales')
  
  // Update peer group when active group changes
  const currentPeerGroup = peerGroups[activeGroup]

  // Transform data for charts
  const chartData = institutionsData.map(inst => ({
    name: inst.name,
    marketShare: inst.marketShare,
    growth: inst.growth,
    operations: inst.operations,
    amount: inst.amount,
    color: inst.color,
  }))

  const sortedByGrowth = [...chartData].sort((a, b) => b.growth - a.growth)
  const sortedByMarketShare = [...chartData].sort((a, b) => b.marketShare - a.marketShare)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Instituciones Financieras</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Análisis por Entidad Supervisada
        </p>
      </div>

      {/* Alert Stream */}
      <AlertStream maxAlerts={5} />

      {/* Peer Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Grupo Peer</h3>
            <p className="text-sm text-gray-500 mt-1">Selecciona la institución y su grupo comparativo</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {peerGroupInstitutions.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name}</option>
              ))}
            </select>
            <select
              value={activeGroup}
              onChange={(e) => setActiveGroup(e.target.value as keyof typeof peerGroups)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="bancos-comerciales">Bancos Comerciales</option>
              <option value="mic">MICs</option>
              <option value="cooperativas">Cooperativas</option>
              <option value="digitales">Digitales</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Peer Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PeerScatterChart />
        <PeerRadarChart 
          institutionId={selectedInstitution}
          peerGroupIds={currentPeerGroup}
        />
      </div>

      {/* Z-Score Timeline */}
      <ZScoreChart 
        institutionId={selectedInstitution}
        peerGroupIds={currentPeerGroup}
      />

      {/* Traditional Overview (kept for continuity) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Crecimiento Más Alto</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{sortedByGrowth[0].name}</p>
          <div className="flex items-center mt-1">
            <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-sm text-emerald-600 font-medium">+{sortedByGrowth[0].growth}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Crecimiento Más Bajo</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{sortedByGrowth[sortedByGrowth.length - 1].name}</p>
          <div className="flex items-center mt-1">
            <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600 font-medium">{sortedByGrowth[sortedByGrowth.length - 1].growth}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Mayor Participación</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{sortedByMarketShare[0].name}</p>
          <span className="text-sm text-gray-600">{sortedByMarketShare[0].marketShare}% del mercado</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Participación del Mercado
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="marketShare"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Comparison Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Comparación de Crecimiento (%)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedByGrowth} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 12, fill: '#0f172a' }}
                  width={100}
                />
                <Tooltip />
                <Bar 
                  dataKey="growth" 
                  fill="#10B981" 
                  radius={[0, 4, 4, 0]}
                  maxBarSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}