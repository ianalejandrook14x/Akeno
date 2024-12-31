import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let limit = 100
let durationLimit = 50

let handler = async (m, { conn: star, args, text, usedPrefix, command }) => {
  if (!args[0]) return star.reply(m.chat, '✦ *Ingrese el nombre o enlace de un video de YouTube*', m)
  await m.react('🕓')

  try {
    let url = args[0]
    let videoInfo

    if (!url.match(/youtu/gi)) {
      let searchQuery = encodeURIComponent(text)
      let searchApiUrl = `https://deliriussapi-oficial.vercel.app/search/ytsearch?q=${searchQuery}`
      let searchResponse = await fetch(searchApiUrl)
      let searchData = await searchResponse.json()

      if (!searchData.estado || !searchData.datos || searchData.datos.length === 0) {
        return star.reply(m.chat, '✦ *No se encontraron resultados para tu búsqueda.*', m).then(_ => m.react('✖️'))
      }

      videoInfo = searchData.datos[0]
      url = videoInfo.url
    }

    let title, dl_url, thumbnail, sizeMB, duration

    try {
      let yt = await youtubedl(url).catch(async () => await youtubedlv2(url))
      title = await yt.title
      dl_url = await yt.audio['128kbps'].download()
      thumbnail = await yt.thumbnail
      sizeMB = parseFloat((await yt.audio['128kbps'].fileSizeH).replace('MB', ''))
      duration = await yt.duration
    } catch (error) {
      let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${url}`)
      let json = await api.json()

      if (!json.result || !json.result.download || !json.result.metadata) {
        return star.reply(m.chat, '✦ *No se pudo obtener la información del video.*', m).then(_ => m.react('✖️'))
      }

      title = json.result.metadata.title
      dl_url = json.result.download.url
      thumbnail = json.result.metadata.thumbnail
      sizeMB = (json.result.download.size / (1024 * 1024)).toFixed(2)
      duration = json.result.metadata.duration
    }

    let img = await (await fetch(thumbnail)).buffer()

    let txt = '`akeno ytmp3`\n\n'
    txt += `✦ *Titulo* : ${title}\n`
    txt += `✦ *Calidad* : 128kbps\n`
    txt += `✦ *Tamaño* : ${sizeMB} MB\n`
    txt += `✦ *Duración* : ${Math.floor(duration / 60)} minutos\n\n`

    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)

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
handler.command = ['ytmp3']
handler.register = false

export default handler
