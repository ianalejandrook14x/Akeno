let handler = async (m, { conn, text, participants }) => {
    let who;

    if (m.isGroup) {
        who = m.mentionedJid?.[0] || (text && text.replace(/[^0-9]/g, '') + '@s.whatsapp.net');
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    if (!who) return conn.reply(m.chat, '✦ *Menciona al usuario o escribe su número*', m);

    let users = global.db?.data?.users || {};
    
    if (!users[who]) {
        return conn.reply(m.chat, '✦ *El usuario no se encuentra en la base de datos*', m);
    }

    users[who].banned = true;

    conn.reply(m.chat, `✦ *El usuario @${who.split('@')[0]} ha sido baneado*`, m, { mentions: [who] });
};

export const before = async (m) => {
    let users = global.db?.data?.users || {};
    return !users[m.sender]?.banned;
};

handler.command = ['banuser'];
handler.rowner = true;

export default handler;
