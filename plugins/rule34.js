import fetch from 'node-fetch';
const handler = async (m, { conn, args, usedPrefix }) => {
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
        m.react('✅')
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
