import type { PaymentMetric } from '../types/dashboard'

function seasonalFactor(t: number, amplitude: number, frequency: number): number {
  return Math.sin(t * frequency) * amplitude
}

function noise(amplitude: number): number {
  return (Math.random() - 0.5) * amplitude * 2
}

export function generatePaymentData(): PaymentMetric[] {
  const data: PaymentMetric[] = []
  const start = new Date(2024, 0, 1)
  const end = new Date(2026, 2, 1)

  for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
    const year = d.getFullYear()
    const monthIdx = d.getMonth() + 1
    const label = d.toLocaleString('es-PE', { month: 'short', year: 'numeric' })
    const iso = `${year}-${monthIdx.toString().padStart(2, '0')}-01`
    const t = (year - 2024) * 12 + (monthIdx - 1)

    const cce = Math.max(25, 85 - t * 0.35 + seasonalFactor(t, 8, 0.6) + noise(4))
    const yape = Math.min(480, 18 * Math.exp(t * 0.055) + seasonalFactor(t, 12, 0.4) + noise(8))
    const plin = Math.min(120, 12 + t * 1.15 + seasonalFactor(t, 4, 0.5) + noise(3))
    const other = Math.min(45, 3 + t * 0.25 + noise(1.5))

    const cceVal = Math.round(cce * 10) / 10
    const yapeVal = Math.round(yape * 10) / 10
    const plinVal = Math.round(plin * 10) / 10
    const otherVal = Math.round(other * 10) / 10

    const totalOps = cceVal + yapeVal + plinVal + otherVal
    const amount = totalOps * 1.45 + noise(10)

    data.push({
      month: label,
      date: iso,
      cce: cceVal,
      yape: yapeVal,
      plin: plinVal,
      other: otherVal,
      totalOperations: Math.round(totalOps) * 1000,
      totalAmount: Math.round(amount * 100) / 100,
      avgTicket: Math.round((amount / totalOps) * 100) / 100,
    })
  }
  return data
}

export const paymentData = generatePaymentData()

// Institution data with brand colors
export const institutionsData = [
  { id: 'bcp', name: 'BCP', type: 'bank' as const, color: '#FF6D01', marketShare: 32.5, growth: 4.2, isOutlier: false, operations: 1250000, amount: 8500000000 },
  { id: 'bbva', name: 'BBVA', type: 'bank' as const, color: '#004C9E', marketShare: 18.3, growth: 2.8, isOutlier: false, operations: 980000, amount: 5200000000 },
  { id: 'interbank', name: 'Interbank', type: 'bank' as const, color: '#00A650', marketShare: 12.1, growth: 3.5, isOutlier: false, operations: 650000, amount: 3100000000 },
  { id: 'scotiabank', name: 'Scotiabank', type: 'bank' as const, color: '#C8102E', marketShare: 9.8, growth: -0.5, isOutlier: false, operations: 420000, amount: 2500000000 },
  { id: 'banbif', name: 'BanBif', type: 'bank' as const, color: '#FF8C00', marketShare: 6.2, growth: 1.2, isOutlier: false, operations: 280000, amount: 1600000000 },
  { id: 'bn', name: 'Banco de la Nación', type: 'bank' as const, color: '#005CA9', marketShare: 8.5, growth: 5.1, isOutlier: true, operations: 350000, amount: 2200000000 },
]

// FX data (USD/PEN)
export function generateFxData() {
  const data = []
  const start = new Date(2021, 0, 1)
  const end = new Date(2026, 2, 1)
  let currentRate = 3.65

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const volatility = 0.02
    const trend = 0.0001
    const change = (Math.random() - 0.47) * volatility + trend
    currentRate = Math.max(3.2, Math.min(4.2, currentRate + change))

    data.push({
      date: d.toISOString().split('T')[0],
      rate: Math.round(currentRate * 1000) / 1000,
    })
  }
  return data
}