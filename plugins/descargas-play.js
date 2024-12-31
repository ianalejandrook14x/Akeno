import fetch from 'node-fetch'

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '✦ *Ingrese el enlace de una canción de Apple Music.*', m)
  await m.react('🕓')

  try {
    const apiUrl = `https://deliriussapi-oficial.vercel.app/download/applemusicdl?url=${encodeURIComponent(text)}`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (!data.status || !data.data) throw new Error('No se pudo obtener la información de la canción.')

    const { name, image, artists, duration, download } = data.data

    const texto1 = `✦ *Título*\n» ${name}\n\n✦ *Artista*\n» ${artists}\n\n✦ *Duración*\n» ${duration}`.trim()
    await conn.sendFile(m.chat, image, 'thumbnail.jpg', texto1, m)

    await conn.sendMessage(m.chat, { document: { url: download }, mimetype: 'audio/mpeg', fileName: `${name}.mp3` }, { quoted: m })
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
