import fetch from 'node-fetch'

let limit = 100
let durationLimit = 50

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args[0]) return star.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    let query = args.join(' ')
    let videoInfo

    let apiResponse = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(query)}`)
    
    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    let searchResults = await apiResponse.json().catch(() => {
      throw new Error('La respuesta de la API no es JSON válido');
    })

    if (!searchResults.status || !searchResults.data || searchResults.data.length === 0) {
      return star.reply(m.chat, '✦ *No se encontraron resultados para tu búsqueda.*', m).then(_ => m.react('✖️'))
    }

    videoInfo = searchResults.data[0]
    let url = videoInfo.url
    let title = videoInfo.title
    let duration = parseDuration(videoInfo.duration)

    // Obtener información de descarga
    let downloadApi = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`)
    
    // Verificar si la respuesta es JSON
    if (!downloadApi.ok) {
      throw new Error(`HTTP error! status: ${downloadApi.status}`);
    }

    let downloadInfo = await downloadApi.json().catch(() => {
      throw new Error('La respuesta de la API no es JSON válido');
    })

    if (!downloadInfo.result || !downloadInfo.result.download || !downloadInfo.result.metadata) {
      return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
    }

    let dl_url = downloadInfo.result.download.url

    await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
    await m.react('✅')
  } catch (error) {
    console.error(error)
    await star.reply(m.chat, `✦ *Ocurrió un error: ${error.message}*`, m)
    await m.react('✖️')
  }
}

handler.command = ['ytdlmp3']
handler.register = false

export default handler

function parseDuration(duration) {
  let parts = duration.split(':').reverse()
  return parts.reduce((total, part, index) => total + parseInt(part) * Math.pow(60, index), 0)
}
