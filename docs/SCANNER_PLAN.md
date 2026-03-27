# Scanner Plan

## Sources
- twitter / X posts
- smart-wallet tracking
- holder concentration / distribution
- liquidity + volume
- narrative/meta detection
- claim / unlock / bag behavior

## Output
Each scanner should emit normalized `TokenSignal` objects.

## Flow
1. scan source
2. normalize signal
3. score signal
4. create decision
5. pass through risk + sizing
6. execute or ignore
