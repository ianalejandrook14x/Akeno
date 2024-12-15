const free = 25
const prem = 15

var handler = async (m, {conn, isPrems }) => {

let dmt = `${pickRandom([10000, 12000, 15000, 18500, 20000, 23000, 25500, 27000, 30000, 33000, 37000, 40000, 125000,])}` * 1
let exp = `${pickRandom([12500, 13500, 15000, 17500, 19900, 23000, 25500, 27500, 30000, 50000])}` * 1
let exppremium = `${pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500])}` * 1
let d = Math.floor(Math.random() * 30)
global.db.data.users[m.sender].yenes += dmt;
global.db.data.users[m.sender].diamond += d
global.db.data.users[m.sender].money += d
let time = global.db.data.users[m.sender].lastclaim + 86400000 //12 Horas
if (new Date - global.db.data.users[m.sender].lastclaim < 7200000) return conn.reply(m.chat, `*Vuelve en ${msToTime(time - new Date())}*`, m, )
global.db.data.users[m.sender].exp += exppremium ? prem : exp
conn.reply(m.chat, `✧ *Recompensa Diaria*

Recursos:
✧ XP : *+${isPrems ? exppremium : exp}*
✧ Diamantes : *+${d}*
✧ ${currency} : *+${dmt}*`, m, )

global.db.data.users[m.sender].lastclaim = new Date * 1

}
handler.help = ['cofre']
handler.tags = ['rpg']
handler.command = ['cofre']

handler.premium = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? '0' + hours : hours
minutes = (minutes < 10) ? '0' + minutes : minutes
seconds = (seconds < 10) ? '0' + seconds : seconds

return hours + ' Horas ' + minutes + ' Minutos'
}
