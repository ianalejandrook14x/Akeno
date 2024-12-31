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

    // Mostrar los resultados de la búsqueda
    let searchResults = '✦ *Resultados de la búsqueda:*\n\n'
    searchData.data.slice(0, 5).forEach((result, index) => {
      searchResults += `*${index + 1}.* ${result.title} - ${result.artist}\n`
    })
    searchResults += '\n✦ *Responde con el número de la canción que deseas descargar.*'

    await conn.reply(m.chat, searchResults, m)

    
    const filter = (response) => {
      return !isNaN(response) && response > 0 && response <= searchData.data.length
    }
    const { number } = await conn.waitForMessage(m.chat, filter, { time: 30000 })

    
    const selectedSong = searchData.data[number - 1]
    const { title, artist, url, image } = selectedSong

    
    const downloadApiUrl = `https://deliriussapi-oficial.vercel.app/download/applemusicdl?url=${url}`
    const downloadResponse = await fetch(downloadApiUrl)
    const downloadData = await downloadResponse.json()

    if (!downloadData.status || !downloadData.data) {
      return m.reply('✦ *No se pudo descargar la canción.*')
    }

    const { download } = downloadData.data

    
    const songInfo = `✦ *Título*\n» ${title}\n\n✦ *Artista*\n» ${artist}`
    await conn.sendFile(m.chat, image, 'thumbnail.jpg', songInfo, m)
    await conn.sendFile(m.chat, download, `${title}.mp3`, null, m)
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
