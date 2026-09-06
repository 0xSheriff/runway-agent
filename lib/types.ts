export type ChainId = '56' | '1' | '8453' | 'solana';

export interface ChainOption {
  id: ChainId;
  name: string;
  symbol: string;
  logo: string;
  isEVM: boolean;
  explorerUrl: string;
}

export interface Transaction {
  hash: string;
  timestamp: number;
  type: 'inflow' | 'outflow';
  amount: number;
  valueUsd: number;
  from: string;
  to: string;
  category: 'Payroll & Staking' | 'Protocol Operations' | 'Liquidity & Swaps' | 'Treasury Transfers' | 'Gas & Fees';
  label: string;
}

export interface CategoryBreakdown {
  category: string;
  amountUsd: number;
  percentage: number;
}

export interface ChartPoint {
  date: string;
  balanceUsd: number;
  isProjection?: boolean;
}

export interface TreasuryMetrics {
  address: string;
  chainId: ChainId;
  runwayDays: number;
  dailyBurnRate: number;
  totalBalanceUsd: number;
  nativeBalance: number;
  nativeSymbol: string;
  outflow30dUsd: number;
  inflow30dUsd: number;
  transactions: Transaction[];
  categoryBreakdown: CategoryBreakdown[];
  chartData: ChartPoint[];
  hasActivity: boolean;
  isSurplus?: boolean;
  error?: string;
  rateLimited?: boolean;
}
