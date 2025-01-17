import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `✧ *Escriba el título de algún vídeo de Youtube*\n\nEjemplo, ${usedPrefix + command} ${botname}`, m, )

m.react('✅')
let results = await yts(text)
let tes = results.all
let teks = results.all.map(v => {
switch (v.type) {
case 'video': return `✦ *Título:* 
» ${v.title}

✦ *Enlace:* 
» ${v.url}

✦ *Duración:*
» ${v.timestamp}

✦ *Subido:* 
» ${v.ago}

✦ *Vistas:* 
» ${v.views}`}}).filter(v => v).join('\n\n________________________________\n\n')

conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, fkontak, m)

}
handler.command = ['playlist', 'ytbuscar', 'yts', 'ytsearch']

handler.register = false

export default handler
