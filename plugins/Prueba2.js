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

let HS = async (m, { conn, text }) => {
if (!text) {
return m.reply("❀ Ingresa un link de youtube")
}
    
try {
let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${text}`)
let json = await api.json()
let { quality, title, download_url } = json.result

await conn.sendMessage(m.chat, { video: { url: download_url }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = /^(ytmp4)$/i

export default HS
