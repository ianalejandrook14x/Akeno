const groupConfigs = {}; 
const handler = async (m, { text, botTag, isAdmin, groupId }) => {
  if (!isAdmin) {
    return m.reply('*Solo los administradores pueden usar este comando.*');
  }

  if (!text) {
    return m.reply('*Uso correcto: /setprimary <@botTag>*');
  }

  const mentionedBot = text.trim().replace('@', '');

  groupConfigs[groupId] = { primaryBot: mentionedBot };

  m.reply(`*Se ha establecido a @${mentionedBot} como bot primario en este grupo.*`);
};

handler.before = async (m, { botTag, groupId }) => {
  const config = groupConfigs[groupId];
  if (config && config.primaryBot && config.primaryBot !== botTag) {
    return false;
  }

  return true;
};

handler.command = '/setprimary';
export default handler;
