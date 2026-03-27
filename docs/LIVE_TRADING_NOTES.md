# Live Trading Notes

## Intended setup
- execution venue: axiom.trade
- signing: separate signer
- sizing: dynamic, based on confidence + liquidity + holder concentration + exposure

## Guardrails
- live trading stays off by default
- require min confidence threshold
- require min liquidity threshold
- reject bad holder concentration
- cap open positions
- cap max position size

## Next step
Wire a real Axiom execution adapter behind these risk checks.
