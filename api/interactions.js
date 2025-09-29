import { createHandler } from "discraft";
import fs from "fs";
import path from "path";
import registerCommands from "../utils/registerCommands.js";
import settings from "../settings.js";

const handler = createHandler({
  applicationId: settings.appId,
  publicKey: settings.publicKey,
  token: settings.token,
});
