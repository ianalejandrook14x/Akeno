let handler = async (m, { conn, text, mentionedJid }) => {
    let who;

    if (mentionedJid?.[0]) {
        who = mentionedJid[0];
    } else if (text) {
        let cleanedNumber = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        who = cleanedNumber;
    }

    if (!who) {
        return conn.reply(m.chat, "*Menciona al usuario o escirbe su número*", m);
    }

    let users = global.db?.data?.users || {};

    if (!users[who]) {
        return conn.reply(m.chat, `*El usuario @${who.split('@')[0]} no se encuentra la base de datos.*`, m, { mentions: [who] });
    }

    if (!users[who].banned) {
        return conn.reply(m.chat, `✦ *El usuario @${who.split('@')[0]} no está baneado.*`, m, { mentions: [who] });
    }

    users[who].banned = false;

    conn.reply(m.chat, `✦ *El usuario @${who.split('@')[0]} ha sido desbaneado.*`, m, { mentions: [who] });
};

handler.command = ['unbanuser'];
handler.rowner = true;

export default handler;
