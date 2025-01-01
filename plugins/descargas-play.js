import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!args[0]) return m.reply('✦ *Ingresa el nombre de la canción o artista que deseas buscar.*')
  await m.react('🕓')

  try {
    const searchQuery = encodeURIComponent(args.join(' '))
    const searchApiUrl = `https://deliriussapi-oficial.vercel.app/search/applemusicv2?query=${searchQuery}`
    const searchResponse = await fetch(searchApiUrl)
    const searchData = await searchResponse.json()

    if (!searchData.status || !searchData.data || searchData.data.length === 0) {
      return m.reply('✦ *No se encontraron resultados para tu búsqueda.*')
    }

    const firstResult = searchData.data[0]
    const { title, artist, url, image } = firstResult

    const downloadApiUrl = `https://deliriussapi-oficial.vercel.app/download/applemusicdl?url=${url}`
    const downloadResponse = await fetch(downloadApiUrl)
    const downloadData = await downloadResponse.json()

    if (!downloadData.status || !downloadData.data) {
      return m.reply('✦ *No se pudo descargar la canción.*')
    }

    const { download } = downloadData.data

    const txt = `✦ *Título*\n» ${title}\n\n✦ *Artista*\n» ${artist}`

    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: '✦ Akeno channel',
          serverMessageId: -1
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
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

handler.help = ['play']
handler.tags = ['descargas']
handler.command = ['play', 'playaudio']
handler.register = false

export default handler
