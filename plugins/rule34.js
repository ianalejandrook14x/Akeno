import fetch from 'node-fetch';
const handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0]) {
        if (!db.data.chats[m.chat].modohorny && m.isGroup) return m.reply(`✧ Los comandos *NSFW* están desactivados en este grupo.\n> *${usedPrefix}toggle modohorny* para activarlos si eres Administrador.`);
        await conn.reply(m.chat, '✧ Ingresa un tag para realizar la búsqueda.', m);
        return;
    }
    const tag = args[0];
    const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${tag}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data || data.length === 0) {
            await conn.reply(m.chat, `✧ No hubo resultados para *${tag}*`, m);
            return;
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomImage = data[randomIndex];
        const imageUrl = randomImage.file_url;
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `*✦ ${tag}*`, mentions: [m.sender] });
    } catch (error) {
        console.error(error);
        await m.reply('✧ Ocurrió un error inesperado.');
    }
};
handler.help = ['rule34 <tag>'];
handler.command = ['r34', 'rule34'];
handler.tags = ['anime'];
export default handler;
