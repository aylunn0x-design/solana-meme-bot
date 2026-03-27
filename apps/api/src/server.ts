import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { calculateUnrealizedPnl } from "../../../packages/portfolio/src/index.js";
import { state } from "./state.js";

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
    return json(res, 200, { items: state.signals });
  }

  if (url.pathname === "/decisions") {
    return json(res, 200, { items: state.decisions });
  }

  if (url.pathname === "/positions") {
    const items = state.positions.map((position) => ({
      ...position,
      unrealizedPnl: calculateUnrealizedPnl(position),
    }));
    return json(res, 200, { items });
  }

  if (url.pathname === "/history") {
    return json(res, 200, { items: state.history });
  }

  if (url.pathname === "/risk") {
    return json(res, 200, { limits: state.riskLimits });
  }

  if (url.pathname === "/dashboard") {
    const positions = state.positions.map((position) => ({
      ...position,
      unrealizedPnl: calculateUnrealizedPnl(position),
    }));
    const totalUnrealizedPnl = positions.reduce((sum, item) => sum + item.unrealizedPnl, 0);

    return json(res, 200, {
      botStatus: {
        mode: state.riskLimits.allowLiveTrading ? "live" : "paper",
        status: "idle",
      },
      signals: state.signals,
      decisions: state.decisions,
      positions,
      history: state.history,
      totalUnrealizedPnl,
      riskLimits: state.riskLimits,
    });
  }

  return json(res, 404, { ok: false, error: "not_found" });
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`solana-meme-bot api listening on http://localhost:${port}`);
});
