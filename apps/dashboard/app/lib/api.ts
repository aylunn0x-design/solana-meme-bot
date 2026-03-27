const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function getApiBase() {
  return base;
}

export async function getDashboardData() {
  try {
    const res = await fetch(`${base}/dashboard`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function getBacktestData() {
  try {
    const res = await fetch(`${base}/backtest`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}
