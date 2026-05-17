// Extended payment data from 2013 to 2026
import type { PaymentMetric } from '../types/dashboard';

function seasonalFactor(t: number, amplitude: number, frequency: number): number {
  return Math.sin(t * frequency) * amplitude;
}

function noise(amplitude: number, seed: number): number {
  // Deterministic pseudo-random for consistency
  return Math.sin(seed * 0.7 + amplitude * 0.3) * amplitude;
}

export function generatePaymentDataExtended(): PaymentMetric[] {
  const data: PaymentMetric[] = [];
  const startYear = 2013;
  const endYear = 2026;
  const endMonth = 2; // March
  
  let monthIndex = 0;
  
  for (let year = startYear; year <= endYear; year++) {
    const maxMonth = year === endYear ? endMonth : 11;
    
    for (let month = 0; month <= maxMonth; month++) {
      const label = new Date(year, month).toLocaleString('es-PE', { 
        month: 'short', 
        year: 'numeric' 
      });
      const iso = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
      const t = (year - 2013) * 12 + month;
      
      // Earlier years had much lower digital payment adoption
      const yearMultiplier = Math.max(0.1, (year - 2013) / 13); // Normalized 0.1 to 1.0
      
      // CCE: High in early years, declining as digital rises
      const cce = year < 2018 
        ? 80 + noise(5, monthIndex) // High CCE in early years
        : Math.max(25, 85 - t * 0.35 + seasonalFactor(t, 8, 0.6) + noise(4, monthIndex));
      
      // Yape: Exponential growth, started around 2017
      const yape = year < 2017 
        ? 0 // Yape didn't exist before 2017
        : Math.min(480, 18 * Math.exp(t * 0.055) * yearMultiplier + seasonalFactor(t, 12, 0.4) + noise(8, monthIndex));
      
      // Plin: Steady linear growth, started around 2019
      const plin = year < 2019
        ? 0
        : Math.min(120, 12 + t * 1.15 + seasonalFactor(t, 4, 0.5) + noise(3, monthIndex));
      
      // Other wallets: Small, fragmented
      const other = Math.min(45, 3 + t * 0.25 + noise(1.5, monthIndex));
      
      const cceVal = Math.round(cce * 10) / 10;
      const yapeVal = Math.round(Math.max(0, yape) * 10) / 10;
      const plinVal = Math.round(Math.max(0, plin) * 10) / 10;
      const otherVal = Math.round(other * 10) / 10;
      
      const totalOps = cceVal + yapeVal + plinVal + otherVal;
      const amount = totalOps * 1.45 + noise(10, monthIndex);
      
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
      });
      
      monthIndex++;
    }
  }
  
  return data;
}

export const paymentDataExtended = generatePaymentDataExtended();