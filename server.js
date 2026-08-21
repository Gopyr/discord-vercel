import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import settings from "./settings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
let botRunning = false;
global.commandLogs = global.commandLogs || [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function authorizeControl(req, res, next) {
  if (!settings.controlKey) {
    return res.status(503).json({ error: "Control API is disabled until BOT_CONTROL_KEY is configured." });
  }
  if (req.get("x-control-key") !== settings.controlKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
}

app.post("/start", authorizeControl, (req, res) => {
  botRunning = true;
  res.json({ status: "Bot started" });
});

app.post("/stop", authorizeControl, (req, res) => {
  botRunning = false;
  res.json({ status: "Bot stopped" });
});

app.get("/status", (_req, res) => {
  res.json({
    running: botRunning,
    owner: settings.owner || null,
    footer: settings.footer,
    logs: global.commandLogs,
    uptime: process.uptime()
  });
});

export default app;

if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => console.log(`Dashboard listening on http://localhost:${port}`));
}
