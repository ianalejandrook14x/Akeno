import { DisconnectReason } from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";

const handler = async (m, { conn, text, mentionedJid }) => {
    let userJid;

    if (m.quoted) {
        userJid = m.quoted.sender;
    } else if (mentionedJid?.[0]) {
        userJid = mentionedJid[0];
    } else if (text) {
        let cleanedNumber = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        userJid = cleanedNumber;
    }

    if (!userJid) {
        return conn.reply(m.chat, "*❀ Responde a un mensaje del usuario o menciona*", m);
    }

    const userName = userJid.split("@")[0];
    const folderPath = path.join(process.cwd(), "jadi", userName);
    const subBot = global.conns.find(bot => bot.user?.jid === userJid);

    if (!subBot) {
        return conn.reply(m.chat, `*❀ El usuario @${userName} no está conectado.*`, m, { mentions: [userJid] });
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
            console.log(`Carpeta de credenciales eliminada para el JadiBot ${userName}.`);
        }

        await conn.reply(m.chat, `*❀ El JadiBot @${userName} ha sido desconectado.*`, m, { mentions: [userJid] });
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, "*❀ Hubo un error al intentar desconectar al JadiBot.*", m);
    }
};

handler.command = ["disconnect"];
handler.mods = true;

export default handler;
