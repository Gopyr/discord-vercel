const settings = {
  owner: process.env.BOT_OWNER_ID || "",
  footer: process.env.BOT_FOOTER || "Gopan.inc",
  image: process.env.BOT_IMAGE_URL || "",
  token: process.env.DISCORD_BOT_TOKEN || "",
  appId: process.env.DISCORD_APPLICATION_ID || "",
  publicKey: process.env.DISCORD_PUBLIC_KEY || "",
  controlKey: process.env.BOT_CONTROL_KEY || ""
};

export default settings;
