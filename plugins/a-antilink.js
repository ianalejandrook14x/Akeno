let linkRegex = /(https?:\/\/(?:www\.)?(?:t\.me|telegram\.me|whatsapp\.com)\/\S+)|(https?:\/\/chat\.whatsapp\.com\/\S+)|(https?:\/\/whatsapp\.com\/channel\/\S+)/i;

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys || m.fromMe || !m.isGroup) return;
  
  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  const isGroupLink = linkRegex.test(m.text);

  if (!chat.antiLink || isAdmin) return;

  if (isGroupLink) {
    await m.react('❌');

    if (!isBotAdmin) return;

    await conn.sendMessage(m.chat, { delete: m.key });
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    await m.react('✅');

    await conn.sendMessage(m.chat, { 
      text: `*El usuario @${m.sender.split('@')[0]} fue expulsado porque el antilink está activo.*`, 
      mentions: [m.sender] 
    }, {});
  }
}
