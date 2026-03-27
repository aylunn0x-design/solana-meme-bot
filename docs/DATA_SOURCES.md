# Data Sources

## Planned live inputs
- Twitter / X API or tweet provider
- smart-wallet feed
- holder / concentration feed
- liquidity / volume feed
- claim / bag / unlock signals

## Current design
Each source returns normalized `TokenSignal[]` data.
If a provider is not configured, the scanner returns an empty result instead of faking data.

## Env
- `TWITTER_BEARER_TOKEN`
- `WALLET_FEED_URL`
- `HOLDER_FEED_URL`
- `LIQUIDITY_FEED_URL`
