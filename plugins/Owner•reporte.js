let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw '✦ *_Ingrese el error que desea reportar*'
    if (text.length < 10) throw '✦ *Especifique bien el error, mínimo 10 caracteres.*'
    if (text.length > 1000) throw ' *Máximo 1000 caracteres para enviar el error.*'
    const teks = `\n〘 *R E P O R T E* ✦ 〙⊷\n├───────────────────\n✦ *Usuario:*\n✦ Wa.me/${m.sender.split`@`[0]}\n\n✦ *Mensaje:*\n✦ ${text}\n`
    await conn.reply(global.owner[0][0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })
    m.reply('✦ *Reporte enviando*')
}
handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']

export default handler
