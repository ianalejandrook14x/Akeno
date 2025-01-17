let subBots = {};

let handler = async (m, { conn, text }) => {
  const now = new Date();

  if (!text) {
    if (!subBots[m.sender]) {
      subBots[m.sender] = { startTime: new Date() };
      console.log(`Usuario ${m.sender} se ha conectado.`);
    }

    const diff = now - subBots[m.sender].startTime;
    const uptime = formatDuration(diff);
    await m.reply(`*Tiempo de conexión:* ${uptime}.`);
    return;
  }

  if (isNaN(text)) {
    return m.reply("❀ *Ingresa un número válido de algun JadiBot*");
  }

  const id = parseInt(text);

  if (!subBots[id]) {
    subBots[id] = { startTime: new Date() };
    console.log(`SubBot ${id} se ha conectado.`);
  }

  const diff = now - subBots[id].startTime;
  const uptime = formatDuration(diff);
  await m.reply(`*Tiempo de conexión:* ${uptime}.`);
};

handler.command = ['estado'];

export default handler;

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const displaySeconds = seconds % 60;
  const displayMinutes = minutes % 60;
  const displayHours = hours % 24;

  return `\`${days}${displayHours}:${displayMinutes}${displaySeconds}\``;
}
