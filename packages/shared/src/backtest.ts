export interface ReplaySignal {
  mint: string;
  symbol?: string;
  score: number;
  entryPrice: number;
  exitPrice: number;
  timestamp: string;
}

export interface BacktestTrade {
  mint: string;
  symbol?: string;
  sizeUsd: number;
  entryPrice: number;
  exitPrice: number;
  pnlUsd: number;
  won: boolean;
}

export interface BacktestSummary {
  trades: number;
  wins: number;
  losses: number;
  winRate: number;
  totalPnlUsd: number;
  avgPnlUsd: number;
  maxDrawdownUsd: number;
}
