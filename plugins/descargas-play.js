import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    
    const search = await yts(text)
    const yt_play = search.videos[0]
    if (!yt_play) return conn.reply(m.chat, '✦ *No se encontraron resultados.*', m)

   
    const texto1 = `✦ *Título*\n» ${yt_play.title}\n\n✦ *Publicado*\n» ${yt_play.ago}\n\n✦ *Duración*\n» ${secondString(yt_play.duration.seconds)}`.trim()
    await conn.sendFile(m.chat, yt_play.thumbnail, 'thumbnail.jpg', texto1, m)

    
    const yt = await youtubedl(yt_play.url).catch(async () => await youtubedlv2(yt_play.url))

    if (command == 'play') {
      
      const audio = await yt.audio['128kbps'].download()
      await conn.sendMessage(m.chat, { document: { url: audio }, mimetype: 'audio/mpeg', fileName: `${yt_play.title}.mp3` }, { quoted: m })
    } else if (command == 'play2') {
      
      const video = await yt.video['360p'].download()
      await conn.sendMessage(m.chat, { document: { url: video }, mimetype: 'video/mp4', fileName: `${yt_play.title}.mp4` }, { quoted: m })
    }

    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.react('✖️')
  }
}

handler.help = ['play', 'play2']
handler.tags = ['descargas']
handler.command = ['play', 'play2']
handler.register = false

export default handler

function secondString(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : ''
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : ''
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : ''
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : ''
  return dDisplay + hDisplay + mDisplay + sDisplay
}
