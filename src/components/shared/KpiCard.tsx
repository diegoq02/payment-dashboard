import type { FC } from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, TrendingUp, TrendingDown } from 'lucide-react'
import { SparklineChart } from '../charts/SparklineChart'
import { KpiCardExpanded } from './KpiCardExpanded'
import { paymentDataExtended } from '../../data/mockPaymentsExtended'

interface KpiCardProps {
  title: string
  value: string
  change: number
  sparklineData: number[]
  color: string
  dataKey: string
}

export const KpiCard: FC<KpiCardProps> = ({
  title,
  value,
  change,
  sparklineData,
  color,
  dataKey,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isPositive = change >= 0

  return (
    <>
      {/* Regular Card */}
      <motion.div
        layout
        onClick={() => setIsExpanded(true)}
        className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer ${
          isExpanded ? 'hidden' : 'block'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <Maximize2 className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
            {value}
          </h3>
          <div
            className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
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
        <SparklineChart data={sparklineData} color={color} />
      </motion.div>

      {/* Expanded Card */}
      <AnimatePresence>
        {isExpanded && (
          <KpiCardExpanded
            title={title}
            value={value}
            change={change}
            color={color}
            data={paymentDataExtended}
            dataKey={dataKey}
            onClose={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}