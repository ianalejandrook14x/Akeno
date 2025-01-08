let handler = async (m, { conn, isRowner }) => {
  const newJadiname = m.text.trim().split(' ').slice(1).join(' ');

  if (!newJadiname) {
    return m.reply('*Proporciona un nuevo nombre para el bot ✦*');
  }

  const userId = m.sender;
  if (!global.subbots) global.subbots = {};

  if (!global.subbots[userId]) {
    return m.reply('*Este comando solo puede ser usado por el dueño del PreBot*');
  }

  global.subbots[userId].jadiname = newJadiname;
  m.reply(`*El nombre de tu subbot ha sido actualizado a: ${newJadiname} ✦*`);
};

handler.help = ['setname'];
handler.tags = ['customization'];
handler.command = ['setname'];
handler.mods = true;

export default handler;
