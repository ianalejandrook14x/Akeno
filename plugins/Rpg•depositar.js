import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply('✧ Ingresa la cantidad de *${currency}* que deseas Depositar.')
if ((args[0]) < 1) return m.reply('✧ Ingresa una cantidad válida de *${currency}*.')
if (args[0] == 'all') {
let count = parseInt(user.yenes)
user.yenes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} ${currency}* al Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('✧ La cantidad debe ser un Numero.')
let count = parseInt(args[0])
if (!user.yenes) return m.reply('No tienes *${currency}* en la Cartera.')
if (user.estrellas < count) return m.reply(`Solo tienes *${user.yenes} ${currency}* en la Cartera.`)
user.yenes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} ${currency}* al Banco.`)}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'dep', 'aguardar']
handler.register = false
export default handler 
