import fetch from 'node-fetch'
import yts from 'yt-search'

let limit = 100 // Límite de tamaño en MB

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args[0]) return star.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    let url = args[0]
    let videoInfo

    
    if (!url.match(/youtu/gi)) {
      let searchResults = await yts(text)
      if (!searchResults.videos || searchResults.videos.length === 0) {
        return star.reply(m.chat, '✦ *No se encontraron resultados para tu búsqueda.*', m).then(_ => m.react('✖️'))
      }
      videoInfo = searchResults.videos[0]
      url = videoInfo.url
    }

    
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`)
    let json = await api.json()

    if (!json.result || !json.result.download || !json.result.metadata) {
      return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
    }

    let title = json.result.metadata.title
    let dl_url = json.result.download.url
    let thumbnail = json.result.metadata.thumbnail
    let sizeMB = (json.result.download.size / (1024 * 1024)).toFixed(2) 

    if (sizeMB >= limit) {
      return star.reply(m.chat, `✦ *El archivo pesa más de ${limit} MB, se canceló la descarga.*`, m).then(_ => m.react('✖️'))
    }

    let img = await (await fetch(thumbnail)).buffer()

    let txt = '`akeno ytmp3`\n\n'
    txt += `✦ *Titulo* : ${title}\n`
    txt += `✦ *Calidad* : 128kbps\n`
    txt += `✦ *Tamaño* : ${sizeMB} MB\n\n`

    
    await star.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: '✦ Akeno channel', 
          serverMessageId: -1
        },
        externalAdReply: {
          title: '✦ Akeno', 
          body: 'Descargas Play', 
          thumbnailUrl: 'https://i.imgur.com/XYZ1234.jpg', 
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    
    await star.sendMessage(m.chat, {
      audio: { url: dl_url },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mp4',
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: title, 
          serverMessageId: -1
        }
      }
    }, { quoted: m })

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
