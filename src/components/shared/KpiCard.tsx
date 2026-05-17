import type { FC } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { SparklineChart } from '../charts/SparklineChart'

interface KpiCardProps {
  title: string
  value: string
  change: number
  sparklineData: number[]
  color: string
}

export const KpiCard: FC<KpiCardProps> = ({ 
  title, 
  value, 
  change, 
  sparklineData, 
  color 
}) => {
  const isPositive = change >= 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div
          className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3 mr-0.5" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-0.5" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
        {value}
      </h3>
      <SparklineChart data={sparklineData} color={color} />
    </div>
  )
}