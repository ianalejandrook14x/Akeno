import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!args[0]) return m.reply('✦ *Ingresa un enlace de Apple Music.*')
  await m.react('🕓')

  try {
    let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/applemusicdl?url=${args[0]}`)
    let json = await api.json()
    let { data } = json
    let { type, name, image, artists, duration, download } = data

    let JT = `✦ *Título*\n» ${name}\n\n✦ *Artista*\n» ${artists}\n\n✦ *Tipo*\n» ${type}\n\n✦ *Duración*\n» ${duration}`

    await conn.sendFile(m.chat, image, 'thumbnail.jpg', JT, m)
    await conn.sendFile(m.chat, download, `${name}.mp3`, null, m)
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
