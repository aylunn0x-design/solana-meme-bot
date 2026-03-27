const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function getApiBase() {
  return base;
}

async function getJson(path: string) {
  try {
    const res = await fetch(`${base}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function getDashboardData() {
  return getJson("/dashboard");
}

export async function getBacktestData() {
  return getJson("/backtest");
}

export async function getProviderData() {
  return getJson("/providers");
}
