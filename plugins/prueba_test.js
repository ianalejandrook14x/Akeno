import fetch from 'node-fetch';
let handler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'test') {
        const imageUrl = 'https://qu.ax/BWXFU.jpg'; // URL
        const messageText = `test  ${mentionedUser}`;
        await conn.sendButton(m.chat, messageText, 'Test', imageUrl, [
            ['Sí', `${usedPrefix}Si`],
            ['No', `${usedPrefix}No`]
        ], m);
    }
};
let siHandler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'si') {
        const yesImageUrl = 'https://qu.ax/BWXFU.jpg'; // Imagen para la respuesta "Sí"
        const yesMessageText = `*Te gustan las mujeres`;
        await conn.sendMessage(m.chat, { 
            image: { url: yesImageUrl }, 
            caption: yesMessageText
        }, { quoted: m });
    }
};
let noHandler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'no') {
        const noImageUrl = 'https://qu.ax/BWXFU.jpg'; // Imagen para la respuesta "No"
        const noMessageText = `*No te gustan las mujeres`;
        await conn.sendMessage(m.chat, { 
            image: { url: noImageUrl }, 
            caption: noMessageText
        }, { quoted: m });
    }
};
// Vincular los comandos al texto "#test", "si", y "no"
handler.command = ['test', 'si', 'no'];
handler.tags = ["downloader"]
handler.help = ["test"];
export default handler;
