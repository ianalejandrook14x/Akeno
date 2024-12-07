let handler = async (m, { conn, isRowner}) => {
let _muptime
let totalreg = Object.keys(global.db.data.users).length
let totalchats = Object.keys(global.db.data.chats).length
let pp = imagen1
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) 
const used = process.memoryUsage()
let bot = `╭─「 *Estado De ${botname}* 」\n`
bot += `│ ✦ *Creador ∙* ianalejandrook15x\n`
bot += `│ ✦ *Grupos Unidos ∙* ${groupsIn.length}\n`
bot += `│ ✦ *Chats Privados ∙* ${chats.length - groupsIn.length}\n`
bot += `│ ✦ *Total De Chats ∙* ${chats.length}\n`
bot += `│ ✦ *Usuarios Registrados ∙* ${totalreg}\n`
bot += `│ ✦ *Grupos Registrados ∙* ${totalchats}\n`
bot += `│ ✦ *Actividad ∙* ${muptime}\n`
bot += `╰─`
await conn.sendFile(m.chat, pp, 'bot.jpg', bot, fkontak, null, rcanal)
}
handler.help = ['status']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = false
export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}
