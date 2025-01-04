import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn, yenes }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
let username = conn.getName(who)
let perfil = `
✦ *PERFIL DEL USUARIO*
✦ *Nombre:* ${username}
✦ *${currency}:* ${yenes || 'Sin Información'}
✦ *Experiencia:* ${exp || 'Sin Información'}
✦ *Premium*: *${prems ? 'Si' : 'No'}*`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', perfil, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.tags = ['rpg']
handler.command = ['profile', 'perfil']
export default handler
