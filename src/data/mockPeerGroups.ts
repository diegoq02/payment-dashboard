import type { PeerGroupInstitution, MonthlyPeerMetric, AnomalyScore, AlertCard } from '../types/dashboard';

// ───── Helpers ─────
function generateMonthlyMetrics(baseOps: number, startDate: Date, endDate: Date): MonthlyPeerMetric[] {
  const data: MonthlyPeerMetric[] = [];
  let monthIndex = 0;

  for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
    const year = d.getFullYear();
    const month = d.getMonth();
    const label = d.toLocaleString('es-PE', { month: 'short', year: 'numeric' });
    const iso = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;

    // Seasonal + trend + noise
    const t = (year - 2024) * 12 + month;
    const trend = 1 + t * 0.005; // slow growth
    const seasonality = Math.sin(t * 0.5) * 0.1;
    const noise = (Math.random() - 0.5) * 0.15;
    const multiplier = trend * (1 + seasonality + noise);

    const cce = Math.round(baseOps * 0.45 * multiplier);
    const immediate = Math.round(baseOps * 0.30 * multiplier * (1 + t * 0.002));
    const yape = Math.round(baseOps * 0.15 * multiplier * (1 + t * 0.008));
    const plin = Math.round(baseOps * 0.08 * multiplier * (1 + t * 0.005));
    const other = Math.round(baseOps * 0.02 * multiplier);

    const totalOps = cce + immediate + yape + plin + other;
    const totalAmountK = Math.round(totalOps * 12.5 * (1 + (Math.random() - 0.5) * 0.1));
    const avgTicket = Math.round((totalAmountK / totalOps) * 100) / 100;
    const digitalShare = (yape + plin) / totalOps;

    data.push({
      month: label,
      date: iso,
      transfersCce: cce,
      transfersImmediate: immediate,
      totalAmountK,
      totalOps,
      avgTicket,
      digitalShare,
      yape,
      plin,
      other,
    });

    monthIndex++;
  }

  return data;
}

function computeAnomalyScores(metrics: MonthlyPeerMetric[]): AnomalyScore[] {
  const cceValues = metrics.map(m => m.transfersCce);
  const avg = cceValues.reduce((a, b) => a + b, 0) / cceValues.length;
  const std = Math.sqrt(cceValues.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / cceValues.length);

  const digitalValues = metrics.map(m => (m.yape + m.plin));
  const avgDigital = digitalValues.reduce((a, b) => a + b, 0) / digitalValues.length;
  const stdDigital = Math.sqrt(digitalValues.map(x => Math.pow(x - avgDigital, 2)).reduce((a, b) => a + b, 0) / digitalValues.length);

  return metrics.map((m) => {
    const zCce = (m.transfersCce - avg) / std;
    const zDigital = ((m.yape + m.plin) - avgDigital) / stdDigital;
    const isAnomalous = Math.abs(zCce) > 2.5 || Math.abs(zDigital) > 2.5;

    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (Math.abs(zCce) > 3.5 || Math.abs(zDigital) > 3.5) severity = 'critical';
    else if (Math.abs(zCce) > 2.5 || Math.abs(zDigital) > 2.5) severity = 'high';
    else if (Math.abs(zCce) > 1.5 || Math.abs(zDigital) > 1.5) severity = 'medium';

    return {
      month: m.month,
      date: m.date,
      zScoreCce: Math.round(zCce * 100) / 100,
      zScoreDigital: Math.round(zDigital * 100) / 100,
      isAnomalous,
      anomalyType: zCce > 0 ? 'spike' : 'drop',
      severity,
    };
  });
}

// ───── Mock Institutions ─────

const startDate = new Date(2024, 0, 1);
const endDate = new Date(2026, 2, 1);

export const peerGroupInstitutions: PeerGroupInstitution[] = [
  {
    id: 'bcp',
    name: 'BCP',
    group: 'bank',
    sector: 'commercial',
    color: '#FF6D01',
    monthlyMetrics: generateMonthlyMetrics(1250000, startDate, endDate),
    anomalyScores: [],
  },
  {
    id: 'bbva',
    name: 'BBVA',
    group: 'bank',
    sector: 'commercial',
    color: '#004C9E',
    monthlyMetrics: generateMonthlyMetrics(980000, startDate, endDate),
    anomalyScores: [],
  },
  {
    id: 'interbank',
    name: 'Interbank',
    group: 'bank',
    sector: 'commercial',
    color: '#00A650',
    monthlyMetrics: generateMonthlyMetrics(650000, startDate, endDate),
    anomalyScores: [],
  },
  {
    id: 'scotiabank',
    name: 'Scotiabank',
    group: 'bank',
    sector: 'commercial',
    color: '#C8102E',
    monthlyMetrics: (() => {
      const metrics = generateMonthlyMetrics(420000, startDate, endDate);
      // Inject anomaly: March 2025 spike (+34%)
      const mar2025 = metrics.find(m => m.date === '2025-03-01');
      if (mar2025) {
        mar2025.transfersCce = Math.round(mar2025.transfersCce * 1.34);
        mar2025.totalOps = mar2025.transfersCce + mar2025.transfersImmediate + mar2025.yape + mar2025.plin + mar2025.other;
      }
      return metrics;
    })(),
    anomalyScores: [],
  },
  {
    id: 'banbif',
    name: 'BanBif',
    group: 'bank',
    sector: 'commercial',
    color: '#FF8C00',
    monthlyMetrics: (() => {
      const metrics = generateMonthlyMetrics(280000, startDate, endDate);
      // Inject anomaly: June 2025 drop (-18% immediate)
      const jun2025 = metrics.find(m => m.date === '2025-06-01');
      if (jun2025) {
        jun2025.transfersImmediate = Math.round(jun2025.transfersImmediate * 0.82);
        jun2025.totalOps = jun2025.transfersCce + jun2025.transfersImmediate + jun2025.yape + jun2025.plin + jun2025.other;
      }
      return metrics;
    })(),
    anomalyScores: [],
  },
  {
    id: 'banco_nacion',
    name: 'Banco de la Nación',
    group: 'bank',
    sector: 'commercial',
    color: '#005CA9',
    monthlyMetrics: generateMonthlyMetrics(350000, startDate, endDate),
    anomalyScores: [],
  },
];

// Compute anomaly scores for all
peerGroupInstitutions.forEach(inst => {
  inst.anomalyScores = computeAnomalyScores(inst.monthlyMetrics);
});

// Generate alerts from anomaly scores
export const alertCards: AlertCard[] = peerGroupInstitutions.flatMap(inst =>
  inst.anomalyScores
    .filter(a => a.isAnomalous)
    .map(a => {
      const monthData = inst.monthlyMetrics.find(m => m.date === a.date);
      const peerAvg = peerGroupInstitutions.reduce((sum, p) => {
        const m = p.monthlyMetrics.find(x => x.date === a.date);
        return sum + (m?.transfersCce || 0);
      }, 0) / peerGroupInstitutions.length;

      const peerStd = Math.sqrt(
        peerGroupInstitutions.reduce((sum, p) => {
          const m = p.monthlyMetrics.find(x => x.date === a.date);
          return sum + Math.pow((m?.transfersCce || 0) - peerAvg, 2);
        }, 0) / peerGroupInstitutions.length
      );

      return {
        id: `${inst.id}-${a.date}`,
        timestamp: a.date,
        institution: inst.name,
        institutionId: inst.id,
        severity: a.severity,
        metric: a.anomalyType === 'spike' ? 'Transferencias CCE' : 'Transferencias Inmediatas',
        observed: a.anomalyType === 'spike'
          ? ((monthData?.transfersCce || 0) - peerAvg) / peerAvg * 100
          : ((monthData?.transfersImmediate || 0) - peerAvg) / peerAvg * 100,
        peerAvg: peerAvg,
        peerStd: peerStd,
        zScore: a.zScoreCce,
        explanation: `Spike anómalo detectado en ${inst.name} para ${a.month}`,
        peerComparison: peerGroupInstitutions
          .filter(p => p.id !== inst.id)
          .slice(0, 3)
          .map(p => {
            const m = p.monthlyMetrics.find(x => x.date === a.date);
            return `${p.name}: ${m ? ((m.transfersCce - peerAvg) / peerAvg * 100).toFixed(1) : 0}%`;
          }),
      };
    }).filter(a => a.observed !== 0)
);