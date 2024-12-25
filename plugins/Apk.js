import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '✦ *Ingresa el nombre de la aplicación que deseas descargar de Aptoide.*\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* WhatsApp`, m)
  await m.react('🕓')

  try {
    
    const apiUrl = `https://deliriussapi-oficial.vercel.app/download/apk?query=${encodeURIComponent(text)}`
    const response = await fetch(apiUrl)
    const data = await response.json()

    
    if (!data.estado || !data.datos) throw new Error('No se encontraron resultados.')

    
    const { nombre, publicar, tamaño, imagen, descargar, desarrollador, almacenar, estadísticas } = data.datos

    
    const sizeMB = parseFloat(tamaño.replace(' MB', ''))
    if (sizeMB > 300) return conn.reply(m.chat, '✦ *El archivo pesa más de 300 MB, se canceló la descarga.*', m).then(_ => m.react('✖️'))

    
    let txt = `*Aptoide apk*\n\n`
    txt += `✦ *Nombre* : ${nombre}\n`
    txt += `✦ *Publicado* : ${publicar}\n`
    txt += `✦ *Tamaño* : ${tamaño}\n`
    txt += `✦ *Desarrollador* : ${desarrollador}\n`
    txt += `✦ *Descargas* : ${estadísticas.descargas}\n`
    txt += `✦ *Calificación* : ${estadísticas.calificación.promedio} ⭐\n\n`

    
    await conn.sendFile(m.chat, imagen, 'thumbnail.jpg', txt, m)
    await conn.sendMessage(m.chat, { document: { url: descargar }, mimetype: 'application/vnd.android.package-archive', fileName: `${nombre}.apk` }, { quoted: m })
    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.react('✖️')
  }
}

handler.help = ['aptoide']
handler.tags = ['descargas']
handler.command = ['aptoide', 'apk']
handler.register = false
//handler.limit = 5

export default handler
