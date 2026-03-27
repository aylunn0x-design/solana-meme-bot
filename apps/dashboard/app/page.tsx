import { EmptyState, Section, StatCard, cardStyle } from "./components";

export default function Page() {
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
            <p style={{ margin: 0, color: '#94a3b8' }}>
              Clean control panel for positions, pnl, history, decisions, and bot health.
            </p>
          </div>
          <div style={{ ...cardStyle, padding: '12px 14px', minWidth: 180 }}>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Mode</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Not connected</div>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
          {['Open Positions', 'Unrealized PnL', 'Today\'s Decisions', 'Bot Status'].map((label) => (
            <StatCard key={label} label={label} />
          ))}
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
          <Section title="Positions" right={<span style={{ color: '#64748b', fontSize: 12 }}>Live table goes here</span>}>
            <EmptyState text="No positions yet. When the bot starts tracking or trading, open positions will show here." />
          </Section>

          <div style={{ display: 'grid', gap: 16 }}>
            <Section title="Decision Feed">
              <EmptyState text="No decisions logged yet." />
            </Section>
            <Section title="Risk Controls">
              <EmptyState text="Risk limits and kill switch controls will live here." />
            </Section>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Section title="Trade History">
            <EmptyState text="Executed trades and paper fills will show here once connected." />
          </Section>
          <Section title="Signal Sources">
            <EmptyState text="Twitter, wallet, holder, and narrative signals will show here when ingestion is wired." />
          </Section>
        </section>
      </div>
    </main>
  );
}
