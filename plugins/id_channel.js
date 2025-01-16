const handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`Uso: ${usedPrefix + command} <link>`);
    }

    try {
        const channelId = extractChannelId(text);

        if (!channelId) {
            return m.reply('El enlace no es valido;
        }
        
        m.reply(`${channelId}`);
    } catch (error) {
        console.error(error);
        m.reply('Ocurrio un error');
    }
};

const extractChannelId = (link) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
};

handler.command = ['idchannel'];

export default handler;
