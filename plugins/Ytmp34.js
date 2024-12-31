import fetch from 'node-fetch'

let limit = 100
let durationLimit = 50

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args[0]) return star.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    let query = args.join(' ')
    let videoInfo

    // Buscar el video en YouTube
    let searchApiResponse = await fetch(`https://restapi.apibotwa.biz.id/api/search-yts?message=${encodeURIComponent(query)}`)
    let searchResults = await searchApiResponse.json()

    if (!searchResults.status || !searchResults.data || !searchResults.data.response || !searchResults.data.response.video || !searchResults.data.response.video.length) {
      return star.reply(m.chat, '✦ *No se encontraron resultados para tu búsqueda.*', m).then(_ => m.react('✖️'))
    }

    videoInfo = searchResults.data.response.video[0]
    let url = videoInfo.url
    let title = videoInfo.title
    let thumbnail = videoInfo.thumbnail
    let duration = parseDuration(videoInfo.duration)
    let views = videoInfo.view
    let publishedAt = videoInfo.publishedTime

    // Descargar el video usando la nueva API
    let downloadApiResponse = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${url}`)
    let downloadInfo = await downloadApiResponse.json()

    if (!downloadInfo.status || !downloadInfo.data || !downloadInfo.data.download || !downloadInfo.data.download.url) {
      return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
    }

    let dl_url = downloadInfo.data.download.url
    let quality = downloadInfo.data.download.quality
    let filename = downloadInfo.data.download.filename

    // Crear el mensaje de información con la portada
    let infoMessage = `✦ *Akeno ytmp4* \n\n`
    infoMessage += `✦ *Título* : ${title}\n`
    infoMessage += `✦ *Duración* : ${Math.floor(duration / 60)} minutos\n`
    infoMessage += `✦ *Vistas* : ${views}\n`
    infoMessage += `✦ *Publicado* : ${publishedAt}\n`

    // Enviar la información con la portada
    await star.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: infoMessage
    }, { quoted: m })

    // Crear la caption para el video o documento
    let caption = `✦ *${title}*\n✦ *Duración* : ${Math.floor(duration / 60)} minutos`

    // Verificar si la duración es mayor a 30 minutos (1800 segundos)
    if (duration > 1800) {
      // Enviar como documento (con caption simple)
      await star.sendMessage(m.chat, {
        document: { url: dl_url },
        mimetype: 'video/mp4',
        fileName: filename,
        caption: caption
      }, { quoted: m })
    } else {
      // Enviar como video (con caption simple)
      await star.sendMessage(m.chat, {
        video: { url: dl_url },
        caption: caption
      }, { quoted: m })
    }

    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.react('✖️')
  }
}

handler.help = ['ytmp4']
handler.tags = ['Descargas']
handler.command = ['ytmp4', 'video', 'mp4']
handler.register = false

export default handler

function parseDuration(duration) {
  let parts = duration.split(':').reverse()
  return parts.reduce((total, part, index) => total + parseInt(part) * Math.pow(60, index), 0)
}
