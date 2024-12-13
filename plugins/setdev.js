let handler = async (m, { conn, isRowner }) => {
    const newDev = m.text.trim().split(' ').slice(1).join(' '); 

    if (!newDev) {
        return m.reply('*✦ Proporciona un nombre para dev*');
    }

    global.dev = newDev;

    m.reply(`*✦ La información dev se cambio a: ${newDev}*`);
};

handler.help = ['setdev']; 
handler.tags = ['banner'];
handler.command = ['setdev']; 
handler.rowner = true;

export default handler;
