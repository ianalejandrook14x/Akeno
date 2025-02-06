const handler = async (m, { conn }) => {
    const _muptime = process.uptime() * 1000;
    const muptime = clockString(_muptime);
    
    const message = `*Tiempo Activo: | ${muptime}*\n*Prefijo [${global.prefix}]*`;
    await conn.reply(m.chat, message.trim(), m);
};

handler.customPrefix = /^(check)$/i;
handler.command = new RegExp;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
