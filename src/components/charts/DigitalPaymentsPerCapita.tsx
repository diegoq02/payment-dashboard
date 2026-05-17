import type { FC } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { paymentDataExtended } from '../../data/mockPaymentsExtended'
import { peaData } from '../../data/mockPea'
import { aggregateToYearly } from '../../lib/dataUtils'
import { useState, useMemo } from 'react'

export const DigitalPaymentsPerCapita: FC = () => {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly')

  const combinedData = useMemo(() => {
    // Combine payment data with PEA data
    const combined = paymentDataExtended.map(payment => {
      const peaEntry = peaData.find(p => p.date === payment.date);
      const pea = peaEntry ? peaEntry.pea : 17500; // fallback in thousands
      const digitalTotal = payment.yape + payment.plin + payment.other;
      const perCapita = (digitalTotal * 1000) / pea; // transactions per capita
      
      return {
        ...payment,
        year: new Date(payment.date).getFullYear(),
        digitalTotal,
        pea,
        perCapita: Math.round(perCapita * 100) / 100,
      };
    });
    
    return combined;
  }, []);

  const chartData = useMemo(() => {
    if (viewMode === 'yearly') {
      const yearly = aggregateToYearly(combinedData, 'perCapita');
      return yearly.map(item => ({
        month: item.label,
        perCapita: item.value,
        year: item.year,
      }));
    }
    
    return combinedData.map(item => ({
      month: item.month,
      perCapita: item.perCapita,
      year: item.year,
    }));
  }, [combinedData, viewMode]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Indicador de Pagos Digitales per Cápita
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Pagos digitales (Yape + Plin + Otros) / PEA (Población Económicamente Activa)
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              viewMode === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setViewMode('yearly')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              viewMode === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-percapita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              dy={10}
              interval={viewMode === 'yearly' ? 0 : 'preserveStartEnd'}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickFormatter={(value) => `${value.toFixed(1)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#0f172a', fontWeight: 500 }}
              formatter={(value: any) => {
                if (typeof value === 'number') {
                  return [`${value.toFixed(2)}`, 'Pagos per Cápita']
                }
                return [String(value), 'Pagos per Cápita']
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="perCapita"
              stroke="#8B5CF6"
              fill="url(#grad-percapita)"
              strokeWidth={2}
              name="Pagos Digitales per Cápita"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}