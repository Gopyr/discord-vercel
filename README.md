# Discord Bot on Vercel

A compact Discord interactions bot with a plugin-based command layout and a small status dashboard. The repository is structured for Vercel: Discord sends interaction requests to `api/interactions.js`, while `server.js` serves the dashboard and status endpoints.

## Features

| Area | Current behavior |
| --- | --- |
| Interaction endpoint | Vercel function at `/api/interactions` |
| Commands | Files in `plugins/` are discovered by the Discraft adapter |
| Included examples | `ping` and `uptime` |
| Dashboard | Static page with status polling |
| Runtime | Node.js with Express and Vercel routing |

This is a small starter implementation, not a hosted bot service. It does not persist logs, manage shard state, or provide a production control plane.

## Requirements

You need a Discord application, a bot token, the application's public key and ID, Node.js 18 or newer, and a Vercel project if you want serverless deployment.

## Configuration

Copy `.env.example` to `.env` for local work and fill in the values. Keep `.env` out of Git.

| Variable | Purpose |
| --- | --- |
| `DISCORD_BOT_TOKEN` | Bot token used for command registration and the adapter |
| `DISCORD_APPLICATION_ID` | Discord application ID |
| `DISCORD_PUBLIC_KEY` | Public key used to verify interactions |
| `BOT_OWNER_ID` | Optional owner identifier displayed by the dashboard |
| `BOT_CONTROL_KEY` | Required secret for `/start` and `/stop` |

The control endpoints are deliberately disabled when `BOT_CONTROL_KEY` is missing. If the dashboard is exposed publicly, put it behind an additional access-control layer rather than relying on obscurity.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000` to view the dashboard. The interaction endpoint is available at `http://localhost:3000/api/interactions` when running locally.

## Adding a command

Add a small module to `plugins/`. The filename becomes the command name and the module should follow the handler shape used by the existing `ping.js` and `uptime.js` examples. Review the generated command description before registering commands globally.

## Deploying to Vercel

Import the repository into Vercel, add the environment variables from the table above, and keep the existing `vercel.json` routes. Set the Discord Interactions Endpoint URL to:

```text
https://<your-deployment>.vercel.app/api/interactions
```

Verify the endpoint with a test interaction before registering global commands. Global Discord command propagation can take time, so use a test application when iterating.

## Operational notes

The dashboard state and command log are held in process memory. Serverless instances can restart or run independently, so the status view is best treated as a demonstration. Do not place tokens in `settings.js`, commit deployment output, or expose the control key in browser code.

## License

Released under the [MIT License](LICENSE).
