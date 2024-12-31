import yts from 'yt-search'
import fetch from 'node-fetch'

let limit = 100 // Límite de tamaño en MB

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args[0]) return star.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    let url = args[0]
    let videoInfo

    // Si el texto no es un enlace, buscar el vídeo por nombre
    if (!url.match(/youtu/gi)) {
      let searchResults = await yts(text)
      if (!searchResults.videos || searchResults.videos.length === 0) {
        return star.reply(m.chat, '✦ *No se encontraron resultados para tu búsqueda.*', m).then(_ => m.react('✖️'))
      }
      videoInfo = searchResults.videos[0]
      url = videoInfo.url
    }

    // Obtener la información del vídeo usando la API
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`)
    let json = await api.json()

    if (!json.result || !json.result.download || !json.result.metadata) {
      return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
    }

    let title = json.result.metadata.title
    let dl_url = json.result.download.url
    let thumbnail = json.result.metadata.thumbnail
    let sizeMB = (json.result.download.size / (1024 * 1024)).toFixed(2) // Convertir tamaño a MB

    if (sizeMB >= limit) {
      return star.reply(m.chat, `✦ *El archivo pesa más de ${limit} MB, se canceló la descarga.*`, m).then(_ => m.react('✖️'))
    }

    let img = await (await fetch(thumbnail)).buffer()

    let txt = '`akeno ytmp3`\n\n'
    txt += `✦ *Titulo* : ${title}\n`
    txt += `✦ *Calidad* : 128kbps\n`
    txt += `✦ *Tamaño* : ${sizeMB} MB\n\n`

    // Enviar la información del vídeo con la imagen de la portada
    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)

    // Enviar el archivo de audio
    await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })

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
