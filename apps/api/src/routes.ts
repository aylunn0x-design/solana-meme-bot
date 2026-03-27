import type { IncomingMessage, ServerResponse } from "node:http";
import { calculateUnrealizedPnl } from "../../../packages/portfolio/src/index.js";
import { state } from "./state.js";

function json(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export async function handleRoute(req: IncomingMessage, res: ServerResponse, url: URL) {
  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, { ok: true, service: "solana-meme-bot-api" });
  }

  if (req.method === "GET" && url.pathname === "/signals") {
    return json(res, 200, { items: state.signals });
  }

  if (req.method === "POST" && url.pathname === "/signals") {
    const body = await readBody(req);
    state.signals.push(body);
    return json(res, 201, { ok: true, item: body });
  }

  if (req.method === "GET" && url.pathname === "/decisions") {
    return json(res, 200, { items: state.decisions });
  }

  if (req.method === "POST" && url.pathname === "/decisions") {
    const body = await readBody(req);
    state.decisions.push(body);
    return json(res, 201, { ok: true, item: body });
  }

  if (req.method === "GET" && url.pathname === "/positions") {
    const items = state.positions.map((position) => ({
      ...position,
      unrealizedPnl: calculateUnrealizedPnl(position),
    }));
    return json(res, 200, { items });
  }

  if (req.method === "POST" && url.pathname === "/positions") {
    const body = await readBody(req);
    state.positions.push(body);
    return json(res, 201, { ok: true, item: body });
  }

  if (req.method === "GET" && url.pathname === "/history") {
    return json(res, 200, { items: state.history });
  }

  if (req.method === "POST" && url.pathname === "/history") {
    const body = await readBody(req);
    state.history.push(body);
    return json(res, 201, { ok: true, item: body });
  }

  if (req.method === "GET" && url.pathname === "/risk") {
    return json(res, 200, { limits: state.riskLimits });
  }

  if (req.method === "POST" && url.pathname === "/risk") {
    const body = await readBody(req);
    state.riskLimits = { ...state.riskLimits, ...body };
    return json(res, 200, { ok: true, limits: state.riskLimits });
  }

  if (req.method === "POST" && url.pathname === "/reset") {
    state.signals = [];
    state.decisions = [];
    state.positions = [];
    state.history = [];
    return json(res, 200, { ok: true });
  }

  if (req.method === "GET" && url.pathname === "/dashboard") {
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
}
