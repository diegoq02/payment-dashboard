export function aggregateToYearly<T extends { month: string; date: string; year?: number }>(
  data: T[],
  valueKey: keyof T
): Array<{ year: number; value: number; label: string }> {
  const yearly: Record<number, { sum: number; count: number }> = {};
  
  data.forEach((item) => {
    const year = item.year || new Date(item.date).getFullYear();
    const value = Number(item[valueKey]) || 0;
    
    if (!yearly[year]) {
      yearly[year] = { sum: 0, count: 0 };
    }
    
    yearly[year].sum += value;
    yearly[year].count += 1;
  });
  
  return Object.entries(yearly)
    .map(([year, { sum, count }]) => ({
      year: Number(year),
      value: Math.round((sum / count) * 100) / 100,
      label: String(year),
    }))
    .sort((a, b) => a.year - b.year);
}