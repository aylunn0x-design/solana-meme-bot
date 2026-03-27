import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { calculateUnrealizedPnl } from "../../../packages/portfolio/src/index.js";
import { mockDecisions, mockHistory, mockPositions, mockRiskLimits, mockSignals } from "./mockData.js";

function json(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || "/", "http://localhost:3000");

  if (url.pathname === "/health") {
    return json(res, 200, { ok: true, service: "solana-meme-bot-api" });
  }

  if (url.pathname === "/signals") {
    return json(res, 200, { items: mockSignals });
  }

  if (url.pathname === "/decisions") {
    return json(res, 200, { items: mockDecisions });
  }

  if (url.pathname === "/positions") {
    const items = mockPositions.map((position) => ({
      ...position,
      unrealizedPnl: calculateUnrealizedPnl(position),
    }));
    return json(res, 200, { items });
  }

  if (url.pathname === "/history") {
    return json(res, 200, { items: mockHistory });
  }

  if (url.pathname === "/risk") {
    return json(res, 200, { limits: mockRiskLimits });
  }

  if (url.pathname === "/dashboard") {
    const positions = mockPositions.map((position) => ({
      ...position,
      unrealizedPnl: calculateUnrealizedPnl(position),
    }));
    const totalUnrealizedPnl = positions.reduce((sum, item) => sum + item.unrealizedPnl, 0);

    return json(res, 200, {
      botStatus: {
        mode: mockRiskLimits.allowLiveTrading ? "live" : "paper",
        status: "active",
      },
      signals: mockSignals,
      decisions: mockDecisions,
      positions,
      history: mockHistory,
      totalUnrealizedPnl,
      riskLimits: mockRiskLimits,
    });
  }

  return json(res, 404, { ok: false, error: "not_found" });
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`solana-meme-bot api listening on http://localhost:${port}`);
});
