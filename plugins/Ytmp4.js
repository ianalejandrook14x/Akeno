import yts from 'yt-search'
import fetch from 'node-fetch'

let limit = 100 

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
    let sizeMB = (json.result.download.size / (1024 * 1024)).toFixed(2) // Convertir tamaño a MB

    let img = await (await fetch(thumbnail)).buffer()

    let txt = '`akeno ytmp3`\n\n'
    txt += `✦ *Titulo* : ${title}\n`
    txt += `✦ *Calidad* : 128kbps\n`
    txt += `✦ *Tamaño* : ${sizeMB} MB\n\n`

    
    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)

    
    if (sizeMB >= limit) {
      
      await star.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      await m.react('📄') 
    } else {
      
      await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
      await m.react('✅') // Reacción para indicar éxito
    }
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
