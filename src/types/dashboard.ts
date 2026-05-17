export interface PaymentMetric {
  month: string;
  date: string;
  cce: number;
  yape: number;
  plin: number;
  other: number;
  totalOperations: number;
  totalAmount: number;
  avgTicket: number;
}

export interface PeaDataPoint {
  month: string;
  date: string;
  pea: number; // in thousands
  year: number;
}

export interface Institution {
  id: string;
  name: string;
  type: 'bank' | 'mfi' | 'coop' | 'wallet';
  color: string;
  marketShare: number;
  growth: number;
  isOutlier: boolean;
}

export interface FxDataPoint {
  date: string;
  rate: number;
  ma20?: number;
  ma50?: number;
  bollingerUpper?: number;
  bollingerLower?: number;
  isAnomaly?: boolean;
  event?: string;
}

export interface DigitalPaymentPerCapita {
  month: string;
  date: string;
  year: number;
  totalDigital: number; // Yape + Plin + Other
  pea: number;
  perCapita: number;
  cce: number;
}

// ───── Peer Analysis Types ─────

export interface PeerGroupInstitution {
  id: string;
  name: string;
  group: 'bank' | 'mfi' | 'coop' | 'wallet';
  sector: 'commercial' | 'savings' | 'digital';
  color: string;
  monthlyMetrics: MonthlyPeerMetric[];
  anomalyScores: AnomalyScore[];
}

export interface MonthlyPeerMetric {
  month: string;
  date: string;
  transfersCce: number;
  transfersImmediate: number;
  totalAmountK: number; // in thousands
  totalOps: number;
  avgTicket: number;
  digitalShare: number; // (Yape + Plin) / Total
  yape: number;
  plin: number;
  other: number;
}

export interface AnomalyScore {
  month: string;
  date: string;
  zScoreCce: number;
  zScoreDigital: number;
  isAnomalous: boolean;
  anomalyType: 'spike' | 'drop' | 'normal';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AlertCard {
  id: string;
  timestamp: string;
  institution: string;
  institutionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metric: string;
  observed: number;
  peerAvg: number;
  peerStd: number;
  zScore: number;
  explanation: string;
  peerComparison: string[];
}