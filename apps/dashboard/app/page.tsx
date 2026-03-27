import { EmptyState, Section, StatCard, cardStyle } from "./components";
import { getDashboardData } from "./lib/api";

export default async function Page() {
  const data = await getDashboardData();
  const positions = data?.positions ?? [];
  const history = data?.history ?? [];
  const decisions = data?.decisions ?? [];
  const signals = data?.signals ?? [];
  const mode = data?.botStatus?.mode ?? "not connected";
  const status = data?.botStatus?.status ?? "idle";

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #132033 0%, #081019 58%)',
        color: '#e5eef8',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gap: 20 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.12em', color: '#67e8f9', fontWeight: 800 }}>
              Solana Meme Bot
            </div>
            <h1 style={{ margin: '8px 0 6px', fontSize: 36, lineHeight: 1 }}>Dashboard</h1>
            <p style={{ margin: 0, color: '#94a3b8' }}>Live shell for positions, pnl, history, decisions, and bot health.</p>
          </div>
          <div style={{ ...cardStyle, padding: '12px 14px', minWidth: 180 }}>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Mode</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{mode}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>status: {status}</div>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
          <StatCard label="Open Positions" value={String(positions.length)} />
          <StatCard label="Unrealized PnL" value={String(data?.totalUnrealizedPnl ?? '—')} />
          <StatCard label="Decisions" value={String(decisions.length)} />
          <StatCard label="Signals" value={String(signals.length)} />
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
          <Section title="Positions" right={<span style={{ color: '#64748b', fontSize: 12 }}>{positions.length ? 'Live data' : 'Waiting for data'}</span>}>
            {positions.length ? (
              <div style={{ display: 'grid', gap: 10 }}>
                {positions.map((p: any) => (
                  <div key={p.mint} style={{ border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: 14 }}>
                    <div style={{ fontWeight: 800 }}>{p.symbol || p.mint}</div>
                    <div style={{ fontSize: 13, color: '#94a3b8' }}>qty: {p.qty} · avg: {p.avgEntry} · pnl: {p.unrealizedPnl ?? 0}</div>
                  </div>
                ))}
              </div>
            ) : <EmptyState text="No positions yet." />}
          </Section>

          <div style={{ display: 'grid', gap: 16 }}>
            <Section title="Decision Feed">
              {decisions.length ? <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(decisions, null, 2)}</pre> : <EmptyState text="No decisions logged yet." />}
            </Section>
            <Section title="Risk Controls">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(data?.riskLimits ?? {}, null, 2)}</pre>
            </Section>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Section title="Trade History">
            {history.length ? <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(history.slice(0, 10), null, 2)}</pre> : <EmptyState text="Executed trades and paper fills will show here once connected." />}
          </Section>
          <Section title="Signal Sources">
            {signals.length ? <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(signals.slice(0, 10), null, 2)}</pre> : <EmptyState text="Twitter, wallet, holder, and narrative signals will show here when ingestion is wired." />}
          </Section>
        </section>

        <section>
          <Section title="Backtest Summary">
            <EmptyState text="Backtest results will show here once replay data is connected." />
          </Section>
        </section>
      </div>
    </main>
  );
}
