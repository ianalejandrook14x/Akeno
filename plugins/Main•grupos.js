
import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `
1- Grupo oficial
*✰* ${grupo}`

await conn.sendFile(m.chat, banner, "nino.jpg", grupos, m, null, )

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = ['grupos']
export default handler
