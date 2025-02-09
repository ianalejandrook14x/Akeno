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
        return conn.reply(m.chat, "*Menciona al Jadibot o escribe su número*", m);
    }

    const userName = userJid.split("@")[0];
    const folderPath = path.join(process.cwd(), "jadi", userName);
    const subBotIndex = global.conns.findIndex(bot => bot.user?.jid === userJid);

    if (subBotIndex === -1) {
        return conn.reply(m.chat, `*El usuario @${userName} no está conectado como JadiBot*`, m, { mentions: [userJid] });
    }

    let subBot = global.conns[subBotIndex];
    global.conns.splice(subBotIndex, 1);

    try {
        if (subBot.ws.readyState === subBot.ws.OPEN) {
            subBot.ws.close(DisconnectReason.loggedOut);
        }
        subBot.ev.removeAllListeners();
    } catch (error) {
        console.error(error);
    }

    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
    }

    conn.reply(m.chat, `*El JadiBot @${userName} ha sido desconectado*`, m, { mentions: [userJid] });
};

handler.command = ["disconnect"];
handler.mods = true;

export default handler;
