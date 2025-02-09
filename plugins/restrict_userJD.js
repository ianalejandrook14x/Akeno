let handler = async (m, { conn, text, mentionedJid }) => {
    let who;

    if (mentionedJid?.[0]) {
        who = mentionedJid[0];
    } else if (text) {
        let cleanedNumber = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        who = cleanedNumber;
    }

    if (!who) {
        return conn.reply(m.chat, "*Menciona al usuario o escribe su número*", m);
    }

    let restrictedUsers = global.db?.data?.restricted || {};
    
    if (restrictedUsers[who]) {
        return conn.reply(m.chat, `*El usuario @${who.split('@')[0]} ya se encuentra restringido.*`, m, { mentions: [who] });
    }

    restrictedUsers[who] = true;

    conn.reply(m.chat, `*El usuario @${who.split('@')[0]} ha sido restringido*`, m, { mentions: [who] });
};

handler.command = ['restrict'];
handler.rowner = true;

export default handler;
