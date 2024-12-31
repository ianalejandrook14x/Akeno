
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return m.reply(`Ingresa un enlace de AppleMusic`)
    
try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/applemusicdl?url=${args[0]}`)
let json = await api.json()
let { data } = json
let { type, name, image, artists, duration, download } = data

let JT = `*Titulo:* ${name}
*autor:* ${artists}
*Tipo :* ${type}
*Duracion :* ${duration}`


await conn.sendFile(m.chat, image, `HasumiBotFreeCodes.jpeg`, JT, m);
await conn.sendFile(m.chat, download, 'hasumiBotFreeCodes.mp3', null, m)

} catch (error) {
console.error(error)
}}

handler.command = /^(play)$/i

export default handler
