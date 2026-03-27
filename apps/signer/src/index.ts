import { createServer } from "node:http";

function json(res: any, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost:3010");

  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, { ok: true, service: "solana-meme-bot-signer" });
  }

  if (req.method === "POST" && url.pathname === "/sign-and-send") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(Buffer.from(chunk));
    const raw = Buffer.concat(chunks).toString("utf8");
    const body = raw ? JSON.parse(raw) : {};

    if (!body.serializedTxBase64) {
      return json(res, 400, { ok: false, error: "missing serializedTxBase64" });
    }

    return json(res, 501, {
      ok: false,
      error: "signer_not_wired",
      note: "Attach your actual signing/sending logic here.",
    });
  }

  return json(res, 404, { ok: false, error: "not_found" });
});

const port = Number(process.env.PORT || 3010);
server.listen(port, () => {
  console.log(`signer listening on http://localhost:${port}`);
});
