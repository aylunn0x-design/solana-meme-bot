import type { Position } from "../../shared/src/types.js";

export function calculateUnrealizedPnl(position: Position): number {
  if (position.currentPrice == null) return 0;
  return (position.currentPrice - position.avgEntry) * position.qty;
}
