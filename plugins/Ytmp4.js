import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn: star, args, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) return star.reply(m.chat, '✦ *Ingrese el enlace de un video de YouTube*', m)
 if (!args[0].match(/youtu/gi)) return star.reply(m.chat, `✦ *Verifica que el enlace sea de YouTube.*`, m).then(_ => m.react('✖️'))
  
  let q = '128kbps'
  await m.react('🕓')

  try {
    let v = args[0]
    let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
    let dl_url = await yt.audio[q].download()
    let title = await yt.title
    let size = await yt.audio[q].fileSizeH
    let thumbnail = await yt.thumbnail

    let img = await (await fetch(`${thumbnail}`)).buffer()  
    if (size.split('MB')[0] >= limit) return star.reply(m.chat, `✦ *El archivo pesa más de ${limit} MB, se canceló la descarga.*`, m, rcanal).then(_ => m.react('✖️'))
    
    let txt = '`akeno ytmp3`\n\n'
    txt += `✦ *Titulo* : ${title}\n`
    txt += `✦ *Calidad* : ${q}\n`
    txt += `✦ *Tamaño* : ${size}\n\n`
    
    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)
    await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.react('✖️')
  }
}

handler.help = ['ytmp3']
handler.tags = ['Descargas']
handler.command = ['ytmp3']
handler.register = false

export default handler
