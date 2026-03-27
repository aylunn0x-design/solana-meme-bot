# Backtesting

## Current scope
- replay signal history
- run paper backtests on historical entries/exits
- compute summary stats

## Metrics
- trades
- wins / losses
- win rate
- total pnl
- average pnl
- max drawdown

## Next step
Feed real historical signal data into `apps/api/src/backtestData.ts` or wire a storage layer.
