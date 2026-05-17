import type { FC } from 'react'
import { KpiCard } from '../components/shared/KpiCard'
import { StackedAreaChart } from '../components/charts/StackedAreaChart'
import { DigitalPaymentsPerCapita } from '../components/charts/DigitalPaymentsPerCapita'
import { paymentDataExtended } from '../data/mockPaymentsExtended'
import { Activity, DollarSign, CreditCard, BarChart3 } from 'lucide-react'

const PAYMENT_COLORS = {
  yape: '#10B981',
  plin: '#8B5CF6',
  cce: '#F59E0B',
  other: '#64748B',
}

const kpiData = [
  {
    title: 'Transferencias Interbancarias',
    value: '4.2M',
    change: 5.2,
    sparkline: [10, 15, 12, 20, 25, 22, 30],
    color: '#2563EB',
    icon: Activity,
    dataKey: 'totalOperations',
  },
  {
    title: 'Monto Total',
    value: 'S/ 15.8B',
    change: 3.1,
    sparkline: [12, 18, 15, 22, 28, 25, 35],
    color: '#10B981',
    icon: DollarSign,
    dataKey: 'totalAmount',
  },
  {
    title: 'N° de Operaciones',
    value: '28.5M',
    change: -1.4,
    sparkline: [20, 18, 15, 10, 12, 8, 5],
    color: '#8B5CF6',
    icon: CreditCard,
    dataKey: 'totalOperations',
  },
  {
    title: 'Ticket Promedio',
    value: 'S/ 554',
    change: 2.8,
    sparkline: [5, 8, 12, 10, 15, 18, 20],
    color: '#F59E0B',
    icon: BarChart3,
    dataKey: 'avgTicket',
  },
]

export const OverviewPage: FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resumen Ejecutivo</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Supervisión del Sistema de Pagos Peruanos
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            sparklineData={kpi.sparkline}
            color={kpi.color}
            dataKey={kpi.dataKey}
          />
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Evolución de Operaciones
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Composición por sistema de pago (millones)
          </p>
        </div>
        <StackedAreaChart
          data={paymentDataExtended}
          keys={['yape', 'plin', 'cce', 'other']}
          colors={[PAYMENT_COLORS.yape, PAYMENT_COLORS.plin, PAYMENT_COLORS.cce, PAYMENT_COLORS.other]}
        />
      </div>

      {/* Digital Payments per Capita */}
      <DigitalPaymentsPerCapita />
    </div>
  )
}