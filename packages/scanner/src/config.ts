export const scannerConfig = {
  twitterBearerToken: process.env.TWITTER_BEARER_TOKEN || "",
  walletFeedUrl: process.env.WALLET_FEED_URL || "",
  holderFeedUrl: process.env.HOLDER_FEED_URL || "",
  liquidityFeedUrl: process.env.LIQUIDITY_FEED_URL || "",
};

export function hasScannerConfig() {
  return Boolean(
    scannerConfig.twitterBearerToken ||
    scannerConfig.walletFeedUrl ||
    scannerConfig.holderFeedUrl ||
    scannerConfig.liquidityFeedUrl
  );
}
