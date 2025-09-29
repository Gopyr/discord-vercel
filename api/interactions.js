import { createHandler } from "discraft";
import settings from "../settings.js";

const handler = createHandler({
  applicationId: settings.appId,
  publicKey: settings.publicKey,
  token: settings.token,
});

export default handler;
