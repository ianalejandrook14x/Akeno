const handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`Uso: ${usedPrefix + command} <ñink>`);
    }

    try {
        const channelId = extractChannelId(text);

        if (!channelId) {
            return m.reply('*Enlace de canal de WhatsApp no válido.*');
        }
        m.reply(`${channelId}`);
    } catch (error) {
        console.error(error);
        m.reply('Ocurrío un error');
    }
};
const extractChannelId = (link) => {
    const regex = /(?:https?:\/\/)?chat\.whatsapp\.com\/([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
};

handler.command = ['idchannel'];

export default handler;
