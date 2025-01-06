import { DisconnectReason } from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";

const handler = async (m, { conn, args }) => {
    if (!global.db.data.settings[conn.user.jid].jadibotmd) {
        return conn.reply(m.chat, "*❀ Este Comando está deshabilitado por mi creador.*", m);
    }

    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return conn.reply(m.chat, "*❀ Debes mencionar al usuario que quieres desconectar*", m);
    }

    const userJid = m.mentionedJid[0];
    const userName = userJid.split('@')[0];
    const folderPath = path.join(process.cwd(), "jadi", userName);

    const subBot = global.conns.find(bot => bot.user?.jid === userJid);
    if (!subBot) {
        return conn.reply(m.chat, "*❀ El usuario mencionado no está conectado como JadiBot*", m);
    }

    try {
        if (subBot.ws.readyState === subBot.ws.OPEN) {
            await subBot.ws.close(DisconnectReason.loggedOut);
        }
        subBot.ev.removeAllListeners();
        const index = global.conns.indexOf(subBot);
        if (index >= 0) {
            global.conns.splice(index, 1);
        }

        if (fs.existsSync(folderPath)) {
            fs.rmdirSync(folderPath, { recursive: true });
            console.log(`Carpeta de credenciales eliminada para el subbot ${userName}.`);
        }

        await conn.sendMessage(m.chat, { text: `*❀ @${userName} JadiBot desconectado*`, mentions: [userJid] }, { quoted: m });
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, "*Hubo un error al intentar desconectar al usuario*", m);
    }
};

handler.command = ["disconnect"];
handler.mods = true; 

export default handler;
