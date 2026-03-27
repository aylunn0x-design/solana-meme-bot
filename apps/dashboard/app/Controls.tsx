"use client";

import { useState } from "react";

const panelStyle: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  color: "#e5eef8",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(103,232,249,0.12)",
  color: "#dffcff",
  cursor: "pointer",
  fontWeight: 700,
};

export function Controls(props: { apiUrl: string; defaults: { maxPositionSizeUsd: number; maxDailyLossUsd: number; maxOpenPositions: number; minConfidence: number; minLiquidityUsd: number; maxHolderConcentrationPct: number; allowLiveTrading: boolean; }; }) {
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState(props.defaults);

  async function post(path: string, body?: unknown) {
    setStatus("Working...");
    const res = await fetch(`${props.apiUrl}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    setStatus(res.ok ? `Done: ${path}` : `Failed: ${path}`);
    return data;
  }

  return (
    <div style={panelStyle}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
        <button style={buttonStyle} onClick={() => post("/scan")}>Run scan</button>
        <button style={buttonStyle} onClick={() => post("/reset")}>Reset state</button>
        <button style={buttonStyle} onClick={() => post("/risk", { allowLiveTrading: !risk.allowLiveTrading }).then(() => setRisk({ ...risk, allowLiveTrading: !risk.allowLiveTrading }))}>
          {risk.allowLiveTrading ? "Disable live" : "Enable live"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
        <label>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Max Position USD</div>
          <input style={inputStyle} type="number" value={risk.maxPositionSizeUsd} onChange={(e) => setRisk({ ...risk, maxPositionSizeUsd: Number(e.target.value) })} />
        </label>
        <label>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Max Daily Loss USD</div>
          <input style={inputStyle} type="number" value={risk.maxDailyLossUsd} onChange={(e) => setRisk({ ...risk, maxDailyLossUsd: Number(e.target.value) })} />
        </label>
        <label>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Max Open Positions</div>
          <input style={inputStyle} type="number" value={risk.maxOpenPositions} onChange={(e) => setRisk({ ...risk, maxOpenPositions: Number(e.target.value) })} />
        </label>
        <label>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Min Confidence</div>
          <input style={inputStyle} type="number" step="0.01" value={risk.minConfidence} onChange={(e) => setRisk({ ...risk, minConfidence: Number(e.target.value) })} />
        </label>
        <label>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Min Liquidity USD</div>
          <input style={inputStyle} type="number" value={risk.minLiquidityUsd} onChange={(e) => setRisk({ ...risk, minLiquidityUsd: Number(e.target.value) })} />
        </label>
        <label>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Max Holder %</div>
          <input style={inputStyle} type="number" value={risk.maxHolderConcentrationPct} onChange={(e) => setRisk({ ...risk, maxHolderConcentrationPct: Number(e.target.value) })} />
        </label>
      </div>

      <button style={buttonStyle} onClick={() => post("/risk", risk)}>Save risk settings</button>
      <div style={{ color: "#94a3b8", fontSize: 12 }}>{status || "No action yet."}</div>
    </div>
  );
}
