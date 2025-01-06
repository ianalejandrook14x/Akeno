let handler = async (m, { conn, isRowner }) => {
  const newName = m.text.trim().split(' ').slice(1).join(' ');

  if (!newName) {
    return m.reply('*Proporciona un nuevo nombre para el bot ✦*');
  }

  const userId = m.sender;
  if (!global.subbots) global.subbots = {};

  if (!global.subbots[userId]) {
    return m.reply('*Este comando solo puede ser usado por el dueño del PreBot*');
  }

  global.subbots[userId].name = newName;
  m.reply(`*El nombre de tu subbot ha sido actualizado a: ${newName} ✦*`);
};

handler.help = ['setname'];
handler.tags = ['customization'];
handler.command = ['setname'];
handler.mods = false;

export default handler;
