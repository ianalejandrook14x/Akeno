let handler = async (m, { conn, text }) => {
    let who;

    if (text.includes('@')) {
        who = text.split('@')[1] + '@s.whatsapp.net';
    } else {
        who = `${text}@s.whatsapp.net`;
    }

    let users = global.db.data.users;

    if (!users[who]) {
        users[who] = {};
    }

    users[who].banned = true;

    conn.reply(m.chat, `✦ *El usuario @${who.split('@')[0]} fue baneado*`, fkontak, { mentions: [who] });
};

handler.command = ['banuser'];
handler.rowner = true;

export default handler;
