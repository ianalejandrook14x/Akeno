let handler = async (m, {conn, usedPrefix}) => {
	let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
	if (who == conn.user.jid) return error 
	const name = conn.getName(who);
	let txt = `*✧ Balance de ${name}*
	
		➺ *${currency}* : ${global.db.data.users[who].yenes} 
		➺ *Banco* : ${global.db.data.users[who].bank} 
		➺ *Experiencia* : ${global.db.data.users[who].exp}
	
	> Para proteger tus *${currency}* en el banco use */depositar*`
	await conn.reply(m.chat, txt, m, )
	}
	
	handler.help = ['bal']
	handler.tags = ['rpg']
	handler.command = ['wallet', 'cartera', 'bal']
	handler.register = false
	export default handler
	
