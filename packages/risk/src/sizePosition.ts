import type { SizingInput } from "../../shared/src/types.js";

export function sizePosition(input: SizingInput): number {
  const confidenceFactor = Math.max(0, Math.min(1, input.confidence));
  const liquidityFactor = Math.max(0.2, Math.min(1, input.liquidityUsd / 100000));
  const holderPenalty = input.holderConcentrationPct >= 25 ? 0.35 : input.holderConcentrationPct >= 15 ? 0.65 : 1;
  const exposurePenalty = input.currentExposureUsd >= input.maxPositionSizeUsd * 3 ? 0.5 : 1;

  const raw = input.maxPositionSizeUsd * confidenceFactor * liquidityFactor * holderPenalty * exposurePenalty;
  return Math.max(0, Math.round(raw * 100) / 100);
}
