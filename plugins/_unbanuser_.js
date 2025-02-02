let handler = async (m, { conn, text }) => {
    let who;

    if (text.includes('@')) {
        who = text.split('@')[1] + '@s.whatsapp.net'; 
    } else {
        who = `${text}@s.whatsapp.net`; 
    }

    let users = global.db.data.users;

    if (users[who] && users[who].banned) {
        users[who].banned = false;
        conn.reply(m.chat, `✦ *El usuario @${who.split('@')[0]} ha sido desbaneado*`, fkontak, { mentions: [who] });
    } else {
        conn.reply(m.chat, `✦ *El usuario @${who.split('@')[0]} no está baneado*`, fkontak, { mentions: [who] });
    }
};

handler.command = ['unbanuser'];
handler.rowner = true;

export default handler;
