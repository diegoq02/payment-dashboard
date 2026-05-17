import type { FC } from 'react'
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts'
import { generateFxData } from '../data/mockPayments'
import { Calendar, TrendingUp } from 'lucide-react'

const fxData = generateFxData()

// Calculate moving averages
const dataWithMA = fxData.map((point, index) => {
  const ma20 = index >= 19 ? fxData.slice(index - 19, index + 1).reduce((sum, p) => sum + p.rate, 0) / 20 : null
  const ma50 = index >= 49 ? fxData.slice(index - 49, index + 1).reduce((sum, p) => sum + p.rate, 0) / 50 : null

  // Simple Bollinger bands
  const std = Math.sqrt(
    fxData.slice(Math.max(0, index - 19), index + 1).reduce((sum, p) => sum + Math.pow(p.rate - (ma20 || p.rate), 2), 0) / 20
  )
  const upperBollinger = ma20 ? ma20 + 2 * std : null
  const lowerBollinger = ma20 ? ma20 - 2 * std : null

  return {
    ...point,
    ma20,
    ma50,
    upperBollinger,
    lowerBollinger,
  }
})

export const FxMarketPage: FC = () => {
  const currentRate = dataWithMA[dataWithMA.length - 1].rate
  const lastDay = dataWithMA[dataWithMA.length - 1]
  const prevDay = dataWithMA[dataWithMA.length - 2]
  const dailyChange = lastDay && prevDay ? ((lastDay.rate - prevDay.rate) / prevDay.rate) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mercado Cambiario</h1>
        <p className="text-gray-500 mt-1 text-sm">Análisis del Tipo de Cambio USD/PEN</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Tipo de Cambio Actual</p>
              <p className="text-3xl font-bold text-gray-900">S/ {currentRate.toFixed(3)}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Cambio Diario</p>
              <p className={`text-3xl font-bold ${dailyChange >= 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {dailyChange >= 0 ? '+' : ''}{dailyChange.toFixed(2)}%
              </p>
            </div>
            <div className={`p-2 rounded-lg ${dailyChange >= 0 ? 'bg-red-50' : 'bg-emerald-50'}`}>
              {dailyChange >= 0 ? (
                <TrendingUp className="w-5 h-5 text-red-600" />
              ) : (
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Rango del Año</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.min(...dataWithMA.slice(-365).map(d => d.rate)).toFixed(3)} - {Math.max(...dataWithMA.slice(-365).map(d => d.rate)).toFixed(3)}
              </p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main FX Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">USD/PEN - Últimos 5 Años</h3>
            <p className="text-sm text-gray-500 mt-1">Con Medias Móviles y Bandas de Bollinger</p>
          </div>
        </div>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataWithMA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBollinger" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('es-PE', { month: 'short', year: '2-digit' })
                }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(value) => `${value.toFixed(2)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              
              {/* Bollinger Bands */}
              <Area
                type="monotone"
                dataKey="upperBollinger"
                stroke="transparent"
                fill="url(#colorBollinger)"
                fillOpacity={0.3}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="lowerBollinger"
                stroke="transparent"
                fill="transparent"
                dot={false}
              />
              
              {/* Exchange Rate */}
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#2563EB"
                strokeWidth={2}
                dot={false}
                name="Tipo de Cambio"
              />
              
              {/* Moving Averages */}
              <Line
                type="monotone"
                dataKey="ma20"
                stroke="#10B981"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
                name="MA 20"
              />
              <Line
                type="monotone"
                dataKey="ma50"
                stroke="#F59E0B"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
                name="MA 50"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}