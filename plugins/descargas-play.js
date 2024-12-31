import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!args[0]) return m.reply('✦ *Ingresa el nombre de la canción o artista que deseas buscar.*')
  await m.react('🕓')

  try {
    // Buscar la música usando la API de búsqueda
    const searchQuery = encodeURIComponent(args.join(' '))
    const searchApiUrl = `https://deliriussapi-oficial.vercel.app/search/applemusicv2?query=${searchQuery}`
    const searchResponse = await fetch(searchApiUrl)
    const searchData = await searchResponse.json()

    if (!searchData.status || !searchData.data || searchData.data.length === 0) {
      return m.reply('✦ *No se encontraron resultados para tu búsqueda.*')
    }

    // Obtener el primer resultado de la búsqueda
    const firstResult = searchData.data[0]
    const { title, artist, url, image } = firstResult

    // Descargar la canción usando la API de descarga
    const downloadApiUrl = `https://deliriussapi-oficial.vercel.app/download/applemusicdl?url=${url}`
    const downloadResponse = await fetch(downloadApiUrl)
    const downloadData = await downloadResponse.json()

    if (!downloadData.status || !downloadData.data) {
      return m.reply('✦ *No se pudo descargar la canción.*')
    }

    const { download } = downloadData.data

    // Construir el mensaje con el diseño especificado
    const txt = `✦ *Título*\n» ${title}\n\n✦ *Artista*\n» ${artist}`

    // Enviar el mensaje con la imagen de la portada y el diseño de reenviado
    await conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: 'Canal de Música', // Cambia esto al nombre de tu canal
          serverMessageId: -1
        },
        externalAdReply: {
          title: 'Nombre del Bot', // Cambia esto al nombre de tu bot
          body: 'Desarrollado por Darlingg', // Cambia esto al nombre del desarrollador
          thumbnailUrl: image, // Usa la imagen de la portada de la música
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    // Enviar el archivo de audio con el estilo de reenviado desde el canal
    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: 'Canal de Música', // Cambia esto al nombre de tu canal
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

handler.help = ['play']
handler.tags = ['descargas']
handler.command = ['play']
handler.register = false

export default handler
