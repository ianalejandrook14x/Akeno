let isAdminMode = false; 

let handler = async (m, { conn, isAdmin }) => {
  if (m.text === '/modo_admin') { 
    isAdminMode = true;
    return conn.reply(m.chat, '*Solo los administradores pueden usar el bot.*', m);
  }
  if (isAdminMode && !isAdmin) {
    return conn.reply(m.chat, '*El modo admin está activado. Solo los administradores pueden usar el bot.*', m);
  }
  return conn.reply(m.chat, 'Comando ejecutado correctamente.', m);
};

handler.help = ['modo_admin'];
handler.tags = ['Admin'];
handler.command = ['modo_admin'];
handler.isAdmin = true; 
export default handler;
