let handler = async (m, { conn, isRowner }) => {
    const newPrefix = m.text.trim().split(' ').slice(1).join(' ');

    if (!newPrefix) {
        return m.reply('*Proporcione un nuevo prefijo*');
    }

    if (!/^[^a-zA-Z0-9]{1,2}$/.test(newPrefix)) {
        return m.reply('*No se permiten estos caracteres*');
    }

    global.prefix = newPrefix;
    m.reply(`*El prefijo del bot se cambió a: ${newPrefix}*`);
};

handler.command = ['setprefix'];
handler.mods = true;

export default handler;
