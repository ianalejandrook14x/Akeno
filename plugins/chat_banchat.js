let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `*Este chat fue baneado*`, m)

}
handler.command = ['banchat']

handler.botAdmin = true
handler.admin = true 
handler.group = true

export default handler
