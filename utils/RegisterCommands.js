import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import settings from "../settings.js";

export default async function registerCommands() {
  const appId = settings.appId;
  const token = settings.token;

  const commands = [];

  // Baca semua plugin
  const pluginsPath = path.join(process.cwd(), "plugins");
  fs.readdirSync(pluginsPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const commandName = path.basename(file, ".js");
      commands.push({
        name: commandName,
        description: `Command ${commandName} via plugin`
      });
    }
  });

  // Push ke Discord API
  const url = `https://discord.com/api/v10/applications/${appId}/commands`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bot ${token}`
    },
    body: JSON.stringify(commands)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to register commands: ${err}`);
  }

  console.log(`[REGISTER] ${commands.length} commands registered.`);
}
