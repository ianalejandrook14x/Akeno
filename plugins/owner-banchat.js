let handler = async (m) => {
  const chat = global.db.data.chats[m.chat]; 

  if (!chat) {
    return conn.reply(m.chat, '✦ Este chat no está registrado en la base de datos.', m);
  }

  if (/^\/unbanchat$/i.test(m.text)) {
    chat.isBanned = false; 
    return conn.reply(m.chat, '✦ *El bot ha sido reactivado en este chat.*', m);
  }

  if (chat.isBanned) {
    return;
  }
    
  if (/^\/banchat$/i.test(m.text)) {
    chat.isBanned = true; 
    return conn.reply(m.chat, '✦ *El bot ha sido desactivado en este chat.*', m);
  }
};

handler.help = ['banchat', 'unbanchat'];
handler.tags = ['mods'];
handler.command = ['banchat', 'unbanchat'];
handler.rowner = true;

export default handler;
