# Axiom Integration

## Current state
The repo now has an Axiom adapter layer and API prep function.

## Still needed from docs
- auth method
- exact trade endpoint(s)
- order payload shape
- signer / session flow
- response shape

## Current env plan
- `AXIOM_BASE_URL`
- `AXIOM_API_KEY` (if needed)

## Next implementation step
Once the exact docs pages/endpoints are confirmed, wire the adapter to:
1. create prepared Axiom orders
2. submit gated/manual executions
3. capture execution responses into history
