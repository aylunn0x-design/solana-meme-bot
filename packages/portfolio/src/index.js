export function calculateUnrealizedPnl(position) {
    if (position.currentPrice == null)
        return 0;
    return (position.currentPrice - position.avgEntry) * position.qty;
}
