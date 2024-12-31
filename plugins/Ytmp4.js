import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let limit = 100 // Límite de tamaño en MB
let durationLimit = 50 // Límite de duración en minutos

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

    let title, dl_url, thumbnail, sizeMB, duration

    // Obtener la información usando Bochil Scraper
    try {
      let yt = await youtubedl(url).catch(async () => await youtubedlv2(url))
      title = await yt.title
      dl_url = await yt.audio['128kbps'].download()
      thumbnail = await yt.thumbnail
      sizeMB = parseFloat((await yt.audio['128kbps'].fileSizeH).replace('MB', '')) // Obtener tamaño en MB
      duration = await yt.duration // Obtener la duración en segundos
    } catch (error) {
      // Si Bochil Scraper falla, usar la API como alternativa
      let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`)
      let json = await api.json()

      if (!json.result || !json.result.download || !json.result.metadata) {
        return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
      }

      title = json.result.metadata.title
      dl_url = json.result.download.url
      thumbnail = json.result.metadata.thumbnail
      sizeMB = (json.result.download.size / (1024 * 1024)).toFixed(2) // Convertir tamaño a MB
      duration = json.result.metadata.duration // Obtener la duración en segundos
    }

    let img = await (await fetch(thumbnail)).buffer()

    let txt = '`akeno ytmp3`\n\n'
    txt += `✦ *Titulo* : ${title}\n`
    txt += `✦ *Calidad* : 128kbps\n`
    txt += `✦ *Tamaño* : ${sizeMB} MB\n`
    txt += `✦ *Duración* : ${Math.floor(duration / 60)} minutos\n\n`

    // Enviar la información del vídeo con la imagen de la portada
    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)

    // Verificar la duración y el tamaño del archivo
    if (duration / 60 >= durationLimit || sizeMB >= limit) {
      // Si la duración es mayor o igual a 50 minutos o el tamaño es mayor o igual a 100 MB, enviar como documento
      await star.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      await m.react('📄') // Reacción para indicar que se envió como documento
    } else {
      // Si la duración es menor a 50 minutos y el tamaño es menor a 100 MB, enviar como audio
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
