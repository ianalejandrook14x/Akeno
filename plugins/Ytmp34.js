import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args || !args[0]) return star.reply(m.chat, '✦ *Ingrese el enlace de un video de YouTube*', m)
  if (!args[0].match(/youtu/gi)) return star.reply(m.chat, `✦ *Verifica que el enlace sea de YouTube.*`, m).then(_ => m.react('✖️'))
  
  let q = args[1] || '360p'
  await m.react('🕓')

  try {
    let v = args[0]
    let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
    let dl_url = await yt.video[q].download()
    let title = await yt.title
    let size = await yt.video[q].fileSizeH
    let thumbnail = await yt.thumbnail

    let img = await (await fetch(`${thumbnail}`)).buffer()  
    if (size.split('MB')[0] >= limit) return star.reply(m.chat, `✦ *El archivo pesa más de ${limit} MB, se canceló la descarga.*`, m).then(_ => m.react('✖️'))
    
    let txt = '`Akeno ytmp4`\n\n'
    txt += `✦ *Titulo* : ${title}\n`
    txt += `✦ *Calidad* : ${q}\n`
    txt += `✦ *Tamaño* : ${size}\n\n`
    
    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
    await star.sendMessage(m.chat, { video: { url: dl_url }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m })
    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.react('✖️')
  }
}

handler.help = ['ytmp4']
handler.tags = ['Descargas']
handler.command = ['ytmp4']
handler.register = false

export default handler
