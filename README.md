# Solana Meme Bot

Automated Solana memecoin trading system with scanning, scoring, execution, risk management, portfolio tracking, and dashboarding.

## Goals
- scan tweets, wallets, holders, and narrative signals
- score opportunities automatically
- buy/sell based on strategy rules
- manage exposure like a disciplined system
- show positions, pnl, and trade history in a dashboard

## Architecture
- `apps/api` — bot API and worker entrypoints
- `apps/dashboard` — web dashboard for positions / pnl / history
- `packages/scanner` — tweet, wallet, holder, narrative ingestion
- `packages/scoring` — signal scoring and decision logic
- `packages/execution` — buy/sell execution adapters
- `packages/risk` — portfolio and kill-switch rules
- `packages/portfolio` — positions, pnl, and stats helpers
- `packages/shared` — shared types/config

## Build phases
### v1
- scanner stubs
- scoring engine
- paper execution
- dashboard shell
- mock API endpoints for positions / pnl / history / signals

### v2
- live Solana execution
- wallet management
- portfolio controls

### v3
- adaptive meta detection
- wallet clustering
- better ranking / strategy iteration

## Safety
This repo should support paper trading first, then live execution only with strict risk controls and kill switches.
