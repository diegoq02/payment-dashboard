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

export interface ChartTheme {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  muted: string;
  grid: string;
  tooltipBg: string;
}

export const defaultChartTheme: ChartTheme = {
  primary: '#2563EB',
  secondary: '#7C3AED',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  muted: '#F1F5F9',
  grid: '#E2E8F0',
  tooltipBg: '#FFFFFF',
};