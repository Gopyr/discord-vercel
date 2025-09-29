import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import settings from "./settings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Global state
let botRunning = false;
global.commandLogs = [];

app.use(express.static(path.join(__dirname, "public")));

// API untuk toggle bot
app.post("/start", (req, res) => {
  botRunning = true;
  res.json({ status: "Bot started" });
});

app.post("/stop", (req, res) => {
  botRunning = false;
  res.json({ status: "Bot stopped" });
});

// API untuk info bot
app.get("/status", (req, res) => {
  res.json({
    running: botRunning,
    owner: settings.owner,
    footer: settings.footer,
    logs: global.commandLogs,
    uptime: process.uptime()
  });
});

export default app;
