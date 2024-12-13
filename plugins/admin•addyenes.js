import db from '../lib/database.js'

import MessageType from '@whiskeysockets/baileys'
let impts = 0
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    let dmt = parseInt(txt)
    let yenes = dmt
    let pjk = Math.ceil(dmt * impts)
    yenes += pjk
    let users = global.db.data.users
   users[who].yenes += dmt

   conn.fakeReply(m.chat, `✦ *Recibiste:* \n\n *+${dmt} ${currency}*`, who, m.text)
}

handler.help = ['addyen2 *<@user>*']
handler.tags = ['ADMIN']
handler.command = ['addyen2'] 
handler.admin = true

export default handler
