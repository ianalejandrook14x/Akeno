let handler = async (m, { conn, text }) => {
    try {
               await conn.updateProfileStatus(text).catch(_ => _)
               conn.reply(m.chat, `✦ La información fue cambiada`, m, rcanal)
} catch {
      throw 'Well, Error Sis...'
    }
}
handler.help = ['nuevabiobot <teks>']
handler.tags = ['owner']
handler.command = ['nuevabiobot', 'setbotbot']
handler.owner = true

export default handler
