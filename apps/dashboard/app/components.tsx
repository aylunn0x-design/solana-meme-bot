import type { CSSProperties, ReactNode } from "react";

export const cardStyle: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
};

export const emptyStyle: CSSProperties = {
  border: "1px dashed rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: 18,
  color: "#94a3b8",
  background: "rgba(255,255,255,0.02)",
};

export function StatCard(props: { label: string; value?: string; hint?: string }) {
  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>{props.label}</div>
      <div style={{ fontSize: 28, fontWeight: 800 }}>{props.value ?? "—"}</div>
      <div style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>{props.hint ?? "No live data yet"}</div>
    </div>
  );
}

export function Section(props: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{props.title}</h2>
        {props.right}
      </div>
      {props.children}
    </div>
  );
}

export function EmptyState(props: { text: string }) {
  return <div style={emptyStyle}>{props.text}</div>;
}
