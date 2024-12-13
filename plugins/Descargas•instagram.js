import { igdl } from "ruhend-scraper"

let handler = async (m, { args, conn }) => { 
try {
await m.react(rwait)
let res = await igdl(args[0])
let data = res.data       
for (let media of data) {
await new Promise(resolve => setTimeout(resolve, 2000))           
await conn.sendFile(m.chat, media.url, 'instagram.mp4', '✦ *Tu video de instagram.*\n')
}} catch {
await m.react(error)}}

handler.command = ['instagram', 'ig']
handler.tags = ['descargas']
handler.help = ['instagram', 'ig']
handler.register = false

export default handler
