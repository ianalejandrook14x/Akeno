
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://ibb.co/9H3bspF')
let { premium, level, yenes, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender]
let username = conn.getName(who)
let noprem = `
✦ *Perfil*
✦ *Nombre:* ${username}

✦ *RECURSOS*
✦ *${currency}:* ${yenes}
✦ *Experiencia:* ${exp}`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler
