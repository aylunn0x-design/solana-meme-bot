import { state } from "./state.js";

export function syncPortfolioSnapshot() {
  const openPositions = state.positions.length;
  const totalExposureUsd = state.positions.reduce((sum, position) => {
    const current = position.currentPrice ?? position.avgEntry;
    return sum + current * position.qty;
  }, 0);

  return {
    openPositions,
    totalExposureUsd: Number(totalExposureUsd.toFixed(2)),
    historyCount: state.history.length,
    signalCount: state.signals.length,
    decisionCount: state.decisions.length,
  };
}
