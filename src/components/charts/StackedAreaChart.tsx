import type { FC } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface StackedAreaChartProps {
  data: any[]
  keys: string[]
  colors: string[]
}

export const StackedAreaChart: FC<StackedAreaChartProps> = ({ data, keys, colors }) => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {keys.map((key, i) => (
              <linearGradient 
                key={`grad-${key}`} 
                id={`grad-${key}`} 
                x1="0" y1="0" x2="0" y2="1"
              >
                <stop offset="5%" stopColor={colors[i]} stopOpacity={0.7} />
                <stop offset="95%" stopColor={colors[i]} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f1f5f9" 
            vertical={false} 
          />
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
            width={60}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '13px',
            }}
            itemStyle={{ color: '#0f172a', fontWeight: 500 }}
          />
          <Legend />
          {keys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={colors[i]}
              fill={`url(#grad-${key})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}