import { getJupiterQuote } from "../../../packages/execution/src/jupiter.js";
import { buildJupiterSwap } from "../../../packages/execution/src/jupiterSwap.js";
import { signAndSend } from "../../../packages/execution/src/signer.js";
import { signerConfig } from "./signerConfig.js";

const SOL_MINT = "So11111111111111111111111111111111111111112";

export async function prepareLiveBuy(input: {
  outputMint: string;
  amountLamports: string;
  slippageBps: number;
}) {
  const quote = await getJupiterQuote({
    inputMint: SOL_MINT,
    outputMint: input.outputMint,
    amount: input.amountLamports,
    slippageBps: input.slippageBps,
  });

  if (!signerConfig.signerPublicKey) {
    return { ok: false, error: "missing signer public key", quote };
  }

  const swap = await buildJupiterSwap({
    quoteResponse: quote,
    userPublicKey: signerConfig.signerPublicKey,
    dynamicComputeUnitLimit: true,
    dynamicSlippage: true,
  });

  return {
    ok: true,
    quote,
    swap,
    readyToSign: Boolean(swap.swapTransaction),
  };
}

export async function executePreparedSwap(input: { serializedTxBase64: string }) {
  return signAndSend(
    {
      signerUrl: signerConfig.signerUrl,
      apiKey: signerConfig.signerApiKey,
    },
    { serializedTxBase64: input.serializedTxBase64 },
  );
}
