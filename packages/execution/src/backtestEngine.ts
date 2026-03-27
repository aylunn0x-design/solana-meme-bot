import type { BacktestSummary, BacktestTrade, ReplaySignal } from "../../shared/src/backtest.js";

export function runBacktest(signals: ReplaySignal[], sizeUsd = 100): { trades: BacktestTrade[]; summary: BacktestSummary } {
  const trades: BacktestTrade[] = signals.map((signal) => {
    const pnlPct = signal.entryPrice === 0 ? 0 : (signal.exitPrice - signal.entryPrice) / signal.entryPrice;
    const pnlUsd = Number((sizeUsd * pnlPct).toFixed(2));
    return {
      mint: signal.mint,
      symbol: signal.symbol,
      sizeUsd,
      entryPrice: signal.entryPrice,
      exitPrice: signal.exitPrice,
      pnlUsd,
      won: pnlUsd > 0,
    };
  });

  let equity = 0;
  let peak = 0;
  let maxDrawdownUsd = 0;
  for (const trade of trades) {
    equity += trade.pnlUsd;
    peak = Math.max(peak, equity);
    maxDrawdownUsd = Math.max(maxDrawdownUsd, peak - equity);
  }

  const wins = trades.filter((t) => t.won).length;
  const losses = trades.length - wins;
  const totalPnlUsd = Number(trades.reduce((sum, trade) => sum + trade.pnlUsd, 0).toFixed(2));
  const avgPnlUsd = trades.length ? Number((totalPnlUsd / trades.length).toFixed(2)) : 0;

  return {
    trades,
    summary: {
      trades: trades.length,
      wins,
      losses,
      winRate: trades.length ? Number((wins / trades.length).toFixed(4)) : 0,
      totalPnlUsd,
      avgPnlUsd,
      maxDrawdownUsd: Number(maxDrawdownUsd.toFixed(2)),
    },
  };
}
