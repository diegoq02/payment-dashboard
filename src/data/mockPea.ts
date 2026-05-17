// PEA (Población Económicamente Activa) data since 2013
// Realistic model with 1.2% annual growth and seasonal fluctuations

export interface PeaDataPoint {
  month: string;
  date: string;
  pea: number; // in thousands
  year: number;
}

function seasonalPeaFactor(monthIndex: number, _yearIndex: number): number {
  // Seasonal pattern: higher in summer (Dec-Jan), lower in winter (Jul-Aug)
  const monthInYear = monthIndex % 12;
  // Sinusoidal seasonality, peak in January (0), trough in July (6)
  return Math.cos((monthInYear / 12) * 2 * Math.PI) * 0.5; 
}

export function generatePeaData(): PeaDataPoint[] {
  const data: PeaDataPoint[] = [];
  const startYear = 2013;
  const endYear = 2026;
  const endMonth = 2; // March 2026
  
  let monthIndex = 0;
  
  for (let year = startYear; year <= endYear; year++) {
    const maxMonth = year === endYear ? endMonth : 11;
    
    for (let month = 0; month <= maxMonth; month++) {
      const yearIndex = year - startYear;
      
      // Base PEA: 16,800K in 2013, growing at 1.2% annually
      const basePea = 16800 * Math.pow(1.012, yearIndex);
      
      // Add seasonal fluctuation
      const seasonal = seasonalPeaFactor(monthIndex, yearIndex);
      
      // Add small random noise (deterministic for consistency)
      const noise = Math.sin(monthIndex * 0.7 + year * 0.3) * 0.3;
      
      const pea = Math.round(basePea + seasonal * 100 + noise * 100);
      
      const label = new Date(year, month).toLocaleString('es-PE', { 
        month: 'short', 
        year: 'numeric' 
      });
      
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
      
      data.push({
        month: label,
        date: dateStr,
        pea: pea,
        year: year,
      });
      
      monthIndex++;
    }
  }
  
  return data;
}

export const peaData = generatePeaData();

// Get PEA for a specific date string (YYYY-MM-DD)
export function getPeaForDate(dateStr: string): number {
  const entry = peaData.find(d => d.date === dateStr);
  return entry?.pea || 17500; // fallback
}