const sectionStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: 18,
  boxShadow: '0 12px 40px rgba(0,0,0,0.22)'
};

const emptyStyle: React.CSSProperties = {
  border: '1px dashed rgba(255,255,255,0.12)',
  borderRadius: 16,
  padding: 18,
  color: '#94a3b8',
  background: 'rgba(255,255,255,0.02)'
};

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
          <div style={{ ...sectionStyle, padding: '12px 14px', minWidth: 180 }}>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Mode</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Not connected</div>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
          {['Open Positions', 'Unrealized PnL', 'Today\'s Decisions', 'Bot Status'].map((label) => (
            <div key={label} style={sectionStyle}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>{label}</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>—</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 8 }}>No live data yet</div>
            </div>
          ))}
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Positions</h2>
              <span style={{ color: '#64748b', fontSize: 12 }}>Live table goes here</span>
            </div>
            <div style={emptyStyle}>No positions yet. When the bot starts tracking or trading, open positions will show here.</div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 14px', fontSize: 18 }}>Decision Feed</h2>
              <div style={emptyStyle}>No decisions logged yet.</div>
            </div>
            <div style={sectionStyle}>
              <h2 style={{ margin: '0 0 14px', fontSize: 18 }}>Risk Controls</h2>
              <div style={emptyStyle}>Risk limits and kill switch controls will live here.</div>
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={sectionStyle}>
            <h2 style={{ margin: '0 0 14px', fontSize: 18 }}>Trade History</h2>
            <div style={emptyStyle}>Executed trades and paper fills will show here once connected.</div>
          </div>
          <div style={sectionStyle}>
            <h2 style={{ margin: '0 0 14px', fontSize: 18 }}>Signal Sources</h2>
            <div style={emptyStyle}>Twitter, wallet, holder, and narrative signals will show here when ingestion is wired.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
