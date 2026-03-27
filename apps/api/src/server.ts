import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { handleRoute } from "./routes.js";

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || "/", "http://localhost:3000");
  return handleRoute(req, res, url);
});

const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`solana-meme-bot api listening on http://localhost:${port}`);
});
