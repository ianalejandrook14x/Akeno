let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat;

    let users = global.db.data.users;
    users[who].banned = true;

    conn.reply(m.chat, `✦ *El usuario @${who.split('@')[0]} Fue baneado*`, fkontak, { mentions: [who] });
};

export const before = async (m, { conn }) => {
    const userId = m.sender;
    let users = global.db.data.users;

    if (users[userId] && users[userId].banned) {
        return false;
    }

    return true; 
};

handler.command = ['banuser'];
handler.rowner = true;

export default handler;
