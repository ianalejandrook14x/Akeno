let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '*Este chat no se encuentra registrado*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '*El bot fue desactivado en este chat*', m, fake)
chat.isBanned = false
await conn.reply(m.chat, '*El bot ha sido reactivado*', m, fake)
}

handler.command = ['unbanchat','desbanearchat','desbanchat']
handler.admin = true 
handler.botAdmin = true
handler.group = true

export default handler
