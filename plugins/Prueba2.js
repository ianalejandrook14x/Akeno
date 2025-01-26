
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un  link de youtube`, m)
    
try {
let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`)
let json = await api.json()
let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json
let HS = `- *Titulo :* ${title}
- *Autor :* ${author}
- *Visitas :* ${views}
- *Subido :* ${uploadDate}
- *Duracion :* ${duration}
- *Calidad :* ${quality}p`
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: HS }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['ytmp4']

export default handler
