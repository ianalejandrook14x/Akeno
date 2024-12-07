import db from '../lib/database.js'

import MessageType from '@whiskeysockets/baileys'
let impts = 0
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return m.reply('⚠️️ *Taguea al usuario*')
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) return m.reply('⚠️️ Ingrese la cantidad de *Yenes* que quiere añadir')
    if (isNaN(txt)) return m.reply('⚠️ *sólo números*')
    let dmt = parseInt(txt)
    let yenes = dmt
    let pjk = Math.ceil(dmt * impts)
    yenes += pjk
    if (yenes < 1) return m.reply('⚠️️ Mínimo es  *1*')
    let users = global.db.data.users
   users[who].yenes += dmt

    await conn.reply(m.chat, `⊜ *💴 AÑADIDO*
┏━━━━━━━━━━━⬣
┃⋄ *Total:* ${dmt}
┗━━━━━━━━━━━⬣`, m, )
   conn.fakeReply(m.chat, `⊜ *Recibiste* \n\n *+${dmt} Yenes 💴*`, who, m.text)
}

handler.help = ['addyen2 *<@user>*']
handler.tags = ['ADMIN']
handler.command = ['addyen2'] 
handler.admin = true

export default handler
