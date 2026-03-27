export const scannerConfig = {
  twitterBearerToken: process.env.TWITTER_BEARER_TOKEN || "",
  walletFeedUrl: process.env.WALLET_FEED_URL || "",
  holderFeedUrl: process.env.HOLDER_FEED_URL || "",
  liquidityFeedUrl: process.env.LIQUIDITY_FEED_URL || "",
  birdeyeApiKey: process.env.BIRDEYE_API_KEY || "",
  heliusApiKey: process.env.HELIUS_API_KEY || "",
};

export function hasScannerConfig() {
  return Boolean(
    scannerConfig.twitterBearerToken ||
    scannerConfig.walletFeedUrl ||
    scannerConfig.holderFeedUrl ||
    scannerConfig.liquidityFeedUrl
  );
}
