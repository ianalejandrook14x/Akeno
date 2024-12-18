import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
//m.react('⚙️')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => 'https://qu.ax/AwDYT.jpg')
let biografia = await conn.fetchStatus('5493876639332' +'@s.whatsapp.net').catch(_ => 'Creador de Akeno ✦')
let biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}` +'@s.whatsapp.net').catch(_ => 'Akeno Bot')
let bio = biografia.status?.toString() || 'Creador de Akeno ✦'
let biobot = biografiaBot.status?.toString() || 'Akeno Bot'
let name = await conn.getName(who)

  await sendContactArray(conn, m.chat, [
     [`${nomorown}`, `Creador ✦`, `ιαɳαʅҽʝαɳԃɾσσƙ15x`, dev, botname, `ARG`, bio],
[`${conn.user.jid.split('@')[0]}`, `Eʂ υɳα Ⴆσƚ ✦`, `${botname}`, `✦ No Hacer Spam`, dev, `ARG`]
], m)
  //m.reply(`Hola @${m.sender.split(`@`)[0]} este es el contacto de mi creador, no hagas spam!!`)
  } 

handler.help = ["creador","owner"]
handler.tags = ["info"]
handler.command = ['owner','creador']
export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
        if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
                let contacts = []
        for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
            number = number.replace(/[^0-9]/g, '')
            let njid = number + '@s.whatsapp.net'
            let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
            // N:;${name.replace(/\n/g, '\\n').split(' ').reverse().join(';')};;;
            let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🏷 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim()
            contacts.push({ vcard, displayName: name })
        }
        return await conn.sendMessage(jid, {
            contacts: {
                displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
                contacts,
            }
        },
        {
            quoted,
            ...options
        })
}
