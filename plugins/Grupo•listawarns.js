let handler = async (m, { conn, isOwner }) => {
let adv = Object.entries(global.db.data.users).filter(user => user[1].warn)
let warns = global.db.data.users.warn
let user = global.db.data.users

let caption = `✦ Usuarios Advertidos
*Total : ${adv.length} Usuarios* ${adv ? '\n' + adv.map(([jid, user], i) => `

 *${i + 1}.* ${conn.getName(jid)  == undefined ? 'Sin Usuarios' : conn.getName(jid) + ` *(${user.warn}/4)*`}
 ${isOwner ? '@' + jid.split`@`[0] : jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
\n\n✦ Advertencia ⇢ ${warns ? `*${warns}/4*` : '*0/4*'}\n`
await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) })}

handler.help = ['listadv']
handler.tags = ['grupo']
handler.command = ['listadv', 'listaadv', 'listadv', 'adv', 'advlist', 'advlista']

export default handler
