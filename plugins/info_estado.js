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
    await m.reply(`❀ *Tiempo de Actividad* = ${uptime}`);
    return;
  }

  if (isNaN(text)) {
    return m.reply("❀ Ingresa un número de algún JadiBot que deseas consultar");
  }

  const id = parseInt(text);

  if (!subBots[id]) {
    subBots[id] = { startTime: new Date() };
    console.log(`SubBot ${id} se ha conectado.`);
  }

  const diff = now - subBots[id].startTime;
  const uptime = formatDuration(diff);
  await m.reply(`*Tiempo de actividad del JadiBot:*\n\n *(+${id})* = ${uptime}`);
};

handler.command = ['estado'];

export default handler;

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const displayHours = String(hours).padStart(2, '0');
  const displayMinutes = String(minutes).padStart(2, '0');

  return `${displayHours}:${displayMinutes}`;
}
