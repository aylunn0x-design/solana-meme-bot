import { runBacktest } from "../../../packages/execution/src/backtestEngine.js";
import { replaySignals } from "./backtestData.js";

export function getBacktestResults() {
  return runBacktest(replaySignals);
}
