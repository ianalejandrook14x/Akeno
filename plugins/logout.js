import { DisconnectReason } from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";

const handler = async (m, { conn }) => {
    if (!global.db.data.settings[conn.user.jid]?.jadibotmd) {
        return conn.reply(m.chat, "*❀ Este comando está deshabilitado por mi creador.*", m);
    }

    let userJid;

    // Verificar si se está respondiendo a un mensaje
    if (m.quoted) {
        userJid = m.quoted.sender; // Obtener el ID del mensaje citado
    } else if (m.chat.endsWith("@s.whatsapp.net")) {
        // Si se ejecuta en un chat privado, usar el ID del chat actual
        userJid = m.chat;
    } else {
        return conn.reply(m.chat, "*❀ Usa este comando respondiendo al mensaje del subbot o en un chat privado con el subbot.*", m);
    }

    const userName = userJid.split("@")[0];
    const folderPath = path.join(process.cwd(), "jadi", userName);

    // Buscar el subbot conectado
    const subBot = global.conns.find(bot => bot.user?.jid === userJid);
    if (!subBot) {
        return conn.reply(m.chat, "*❀ El subbot no está conectado.*", m);
    }

    try {
        // Cerrar conexión del subbot
        if (subBot.ws.readyState === subBot.ws.OPEN) {
            await subBot.ws.close(DisconnectReason.loggedOut);
        }
        subBot.ev.removeAllListeners();

        // Eliminar del array global
        const index = global.conns.indexOf(subBot);
        if (index >= 0) {
            global.conns.splice(index, 1);
        }

        // Eliminar carpeta de credenciales
        if (fs.existsSync(folderPath)) {
            fs.rmdirSync(folderPath, { recursive: true });
            console.log(`Carpeta de credenciales eliminada para el JadiBot ${userName}.`);
        }

        // Enviar confirmación
        await conn.reply(m.chat, `*❀ El Jadibot ha sido desconectado.*`, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, "*❀ Hubo un error al intentar desconectar al JadiBot.*", m);
    }
};

handler.command = ["disconnect"];
handler.mods = true; 

export default handler;
