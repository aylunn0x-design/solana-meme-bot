import { fetchJson } from "../../scanner/src/fetchJson.js";

export interface JupiterQuoteParams {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippageBps: number;
}

export async function getJupiterQuote(params: JupiterQuoteParams) {
  const search = new URLSearchParams({
    inputMint: params.inputMint,
    outputMint: params.outputMint,
    amount: params.amount,
    slippageBps: String(params.slippageBps),
  });

  return fetchJson(`https://quote-api.jup.ag/v6/quote?${search.toString()}`);
}
