import type { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Trophy, AlertTriangle, Building2 } from 'lucide-react'
import { institutionsData } from '../data/mockPayments'

export const InstitutionsPage: FC = () => {
  // TODO: Add metric selector support

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

      {/* Summary Cards */}
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Ranking de Instituciones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institución</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Crecimiento</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Operaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedByMarketShare.map((inst) => (
                <tr key={inst.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3" 
                        style={{ backgroundColor: inst.color }}
                      />
                      <span className="text-sm font-medium text-gray-900">{inst.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                    {inst.marketShare}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`flex items-center justify-end ${inst.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {inst.growth >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      <span className="text-sm font-medium">{Math.abs(inst.growth)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                    {inst.operations.toLocaleString('es-PE')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}