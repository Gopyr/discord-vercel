export default function uptime(interaction) {
  const uptime = process.uptime();
  return interaction.reply(`⏱ Uptime: ${Math.floor(uptime)}s`);
}
