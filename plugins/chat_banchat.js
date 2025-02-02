let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `*Este chat fue baneado*`, m, banner)

}
handler.command = ['banchat']

export default handler
