import fetch from 'node-fetch'

let limit = 100 // Límite de tamaño en MB
let durationLimit = 50 // Límite de duración en minutos

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args[0]) return star.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    let query = args.join(' ')
    let videoInfo

    
    let apiResponse = await fetch(`https://deliriussapi-oficial.vercel.app/search/ytsearch?q=${encodeURIComponent(query)}`)
    let searchResults = await apiResponse.json()

    if (!searchResults.status || !searchResults.data || searchResults.data.length === 0) {
      return star.reply(m.chat, '✦ *No se encontraron resultados para tu búsqueda.*', m).then(_ => m.react('✖️'))
    }

    videoInfo = searchResults.data[0]
    let url = videoInfo.url
    let title = videoInfo.title
    let thumbnail = videoInfo.thumbnail
    let duration = parseDuration(videoInfo.duration) 
    let views = videoInfo.views
    let publishedAt = videoInfo.publishedAt

    
    let downloadApi = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`)
    let downloadInfo = await downloadApi.json()

    if (!downloadInfo.result || !downloadInfo.result.download || !downloadInfo.result.metadata) {
      return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
    }

    let dl_url = downloadInfo.result.download.url
    let sizeMB = (downloadInfo.result.download.size / (1024 * 1024)).toFixed(2) 

    let img = await (await fetch(thumbnail)).buffer()

    let txt = '`akeno ytmp3`\n\n'
    txt += `✦ *Título* : ${title}\n`
    txt += `✦ *Vistas* : ${views}\n`
    txt += `✦ *Calidad* : 128kbps\n`
    txt += `✦ *Duración* : ${Math.floor(duration / 60)} minutos\n\n`

    // 
    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)

    // 
    if (duration / 60 >= durationLimit || sizeMB >= limit) {
      await star.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      await m.react('📄')
    } else {
      await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
      await m.react('✅')
    }
  } catch (error) {
    console.error(error)
    await m.react('✖️')
  }
}

handler.help = ['ytmp3']
handler.tags = ['Descargas']
handler.command = ['ytmp3', 'audio']
handler.register = false

export default handler


function parseDuration(duration) {
  let parts = duration.split(':').reverse()
  return parts.reduce((total, part, index) => total + parseInt(part) * Math.pow(60, index), 0)
}
