
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://axeel.my.id/api/download/video?url=${text}`)
let json = await api.json()
let { title, views, likes, description, author } = json.metadata
let HS = `- *Titulo :* ${title}
- *Descripcion :* ${description}
- *Visitas :* ${views}
- *Likes :* ${likes}
- *Autor :* ${author}
- *Tamaño :* ${json.downloads.size}
`
await conn.sendFile(m.chat, json.downloads.url, 'HasumiBotFreeCodes.mp4', HS, m)
} catch (error) {
console.error(error)
}}

handler.command = /^(ytmp4)$/i

export default handler
