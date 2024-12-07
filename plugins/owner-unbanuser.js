const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let user;
    let db = global.db.data.users;
    if (m.quoted) {
        user = m.quoted.sender;
    } else if (args.length >= 1) {
        user = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
        await conn.reply(m.chat, `*✦ Etiqueta o responde al mensaje del usuario que quieras Desbanear*`, m);
        return;
    }
    if (db[user]) {
        db[user].banned = false;
        db[user].banRazon = '';
        const nametag = await conn.getName(user);
        const nn = conn.getName(m.sender);
        await conn.reply(m.chat, `✦ El usuario *${nametag}* fue desbaneado.`, m, { mentionedJid: [user] });
        conn.reply('5493876639332@s.whatsapp.net', `✦ El usuario *${nametag}* fue desbaneado por *${nn}*`, m, );
    } else {
        m.react('✅')
    }
};
handler.help = ['unbanuser <@tag>'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.rowner = true;
handler.group = true;
export default handler;
