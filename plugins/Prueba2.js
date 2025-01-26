/* 

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/


// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un  link de youtube`, m, rcanal)
    
try {
let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${text}`)).json()
let dl_url = api.data.dl

await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: null }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['ytmp4']

export default handler
