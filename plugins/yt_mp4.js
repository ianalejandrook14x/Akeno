import fetch from 'node-fetch'

let limit = 100
let durationLimit = 50

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args[0]) return star.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    let query = args.join(' ')
    let videoInfo

    let searchApiResponse = await fetch(`https://restapi.apibotwa.biz.id/api/search-yts?message=${encodeURIComponent(query)}`)
    
    if (!searchApiResponse.ok) {
      throw new Error(`HTTP error! status: ${searchApiResponse.status}`);
    }

    let searchResults = await searchApiResponse.json().catch(() => {
      throw new Error('La respuesta de la API no es JSON válido');
    })

    if (!searchResults.status || !searchResults.data || !searchResults.data.response || !searchResults.data.response.video || !searchResults.data.response.video.length) {
      return star.reply(m.chat, '✦ *No se encontraron resultados para tu búsqueda.*', m).then(_ => m.react('✖️'))
    }

    videoInfo = searchResults.data.response.video[0]
    let url = videoInfo.url
    let title = videoInfo.title
    let duration = parseDuration(videoInfo.duration)

    let downloadApiResponse = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${url}`)
    
    if (!downloadApiResponse.ok) {
      throw new Error(`HTTP error! status: ${downloadApiResponse.status}`);
    }

    let downloadInfo = await downloadApiResponse.json().catch(() => {
      throw new Error('La respuesta de la API no es JSON válido');
    })

    if (!downloadInfo.status || !downloadInfo.data || !downloadInfo.data.download || !downloadInfo.data.download.url) {
      return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
    }

    let dl_url = downloadInfo.data.download.url
    let caption = `✦ *${title}*\n✦ *Duración* : ${Math.floor(duration / 60)} minutos`

    await star.sendMessage(m.chat, {
      video: { url: dl_url },
      caption: caption,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: '✦ ᥴᥲᥒᥲᥣ ძᥱ іᥲᥒᥲᥣᥱȷᥲᥒძr᥆᥆k15᥊',
          serverMessageId: -1
        }
      }
    }, { quoted: m })

    await m.react('✅')
  } catch (error) {
    console.error(error)
    await star.reply(m.chat, `✦ *Ocurrió un error: ${error.message}*`, m)
    await m.react('✖️')
  }
}

handler.command = ['ytdlmp4']

export default handler

function parseDuration(duration) {
  let parts = duration.split(':').reverse()
  return parts.reduce((total, part, index) => total + parseInt(part) * Math.pow(60, index), 0)
}
