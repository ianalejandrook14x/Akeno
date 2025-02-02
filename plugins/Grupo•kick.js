var handler = async (m, { conn, participants, usedPrefix, command }) => {
    if (!m.mentionedJid[0] && !m.quoted) {
        return conn.reply(m.chat, '✦ *Etiqueta o responde al mensaje de la persona que quieres eliminar*', m);
    }

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net';
    const botID = conn.user.id + '@s.whatsapp.net'; 

    if (botID !== ownerBot) {
        return; 
    }

    if (user === ownerGroup) {
        return conn.reply(m.chat, '✦ No puedo eliminar al propietario del grupo', m);
    }

    if (user === ownerBot) {
        return conn.reply(m.chat, '✦ No puedo eliminar al propietario del bot', m);
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        .then(() => {
            conn.reply(m.chat, `✦ El usuario @${user.split('@')[0]} ha sido eliminado del grupo`, m, { mentions: [user] });
        })
        .catch((err) => {
            console.log(err);
            conn.reply(m.chat, '*Ocurrío un error*', m);
        });
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick', 'ban'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
