import { createHandler } from "discraft";
import settings from "../settings.js";

const handler = createHandler({
  applicationId: settings.appId,
  publicKey: settings.publicKey,
  token: settings.token,
});

// wajib export default untuk Vercel
export default handler;
