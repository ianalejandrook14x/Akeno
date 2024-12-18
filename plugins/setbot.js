const primaryGroups = new Set();

const handler = async (msg, { args, groupId, isAdmin }) => {
  if (!msg.isGroup) return msg.reply('*Este comando solo funciona en grupos.*');
  if (!args[0]) return msg.reply('*Debes mencionar al bot que deseas establecer como primario.*');
  if (!isAdmin) return msg.reply('*Solo los administradores pueden usar este comando.*');
  
  const mentionedTag = args[0].replace('@', '');

  if (mentionedTag !== 'bot_general_tag') return msg.reply('*Solo puedes establecer el bot general como primario.*');
  
  primaryGroups.add(groupId);
  msg.reply(`*El bot ${args[0]} ahora es el bot primario en este grupo.*`);
};

handler.command = ['setbot'];
handler.help = ['setbot <@tag>'];
handler.mods = true; 

export default handler;
