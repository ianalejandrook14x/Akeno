import axios from 'axios';
import yts from 'yt-search';

let limit = 100; // Límite de tamaño en MB

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Verificar si se proporcionó un enlace o un nombre de video
  if (!args[0]) {
    return conn.reply(m.chat, `✦ *Ingrese el nombre de un video de YouTube* o proporcione un enlace.\n\nEjemplo:\n${usedPrefix + command} https://youtu.be/ejemplo\n${usedPrefix + command} nombre del video`, m);
  }

  // Mostrar una reacción de carga
  await m.react('🕒');

  try {
    let query = args.join(' '); // Unir todos los argumentos como consulta

    // Verificar si el argumento es un enlace o un nombre de video
    if (query.startsWith('http') || query.includes('youtu.be') || query.includes('youtube.com')) {
      // Descargar el video desde el enlace
      await handleDownload(m, conn, query);
    } else {
      // Buscar videos por nombre
      await handleSearch(m, conn, query, usedPrefix, command);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ha ocurrido un error inesperado. Inténtalo nuevamente más tarde.', m);
    await m.react('❌');
  }
};

// Función para manejar la descarga de videos desde un enlace
async function handleDownload(m, conn, url) {
  try {
    // Obtener datos del video usando la API
    let apiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
    let response = await axios.get(apiUrl);

    // Verificar si la respuesta es válida
    if (response.status !== 200) {
      await conn.reply(m.chat, 'Error al obtener el video. Verifica el enlace e intenta nuevamente.', m);
      return await m.react('❌');
    }

    let data = response.data;

    // Verificar si el tamaño del video excede el límite
    let sizeMB = data.size / (1024 * 1024); // Convertir tamaño a MB
    if (sizeMB >= limit) {
      await conn.reply(m.chat, `El video pesa más de ${limit} MB, por lo que no se puede enviar.`, m);
      return await m.react('❌');
    }

    // Enviar el video directamente
    await conn.sendMessage(m.chat, {
      video: { url: data.download_url },
      caption: `${data.title}`,
      mimetype: 'video/mp4',
      fileName: `${data.title}.mp4`
    }, { quoted: m });

    // Reacción de éxito
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ha ocurrido un error al descargar el video. Inténtalo nuevamente.', m);
    await m.react('❌');
  }
}

// Función para manejar la búsqueda de videos por nombre
async function handleSearch(m, conn, query, usedPrefix, command) {
  try {
    // Buscar videos usando yt-search
    let searchResults = await yts(query);
    let videos = searchResults.videos.slice(0, 5); // Tomar los primeros 5 resultados

    if (videos.length === 0) {
      await conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
      return await m.react('❌');
    }

    // Mostrar los resultados al usuario
    let resultsText = `✦ *Resultados de la búsqueda para:* ${query}\n\n`;
    videos.forEach((video, index) => {
      resultsText += `*${index + 1}.* ${video.title}\n`;
      resultsText += `   Duración: ${video.timestamp}\n`;
      resultsText += `   Enlace: ${video.url}\n\n`;
    });
    resultsText += `Usa el comando con el enlace del video que deseas descargar.\nEjemplo: ${usedPrefix + command} <enlace>`;

    await conn.reply(m.chat, resultsText, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ha ocurrido un error al buscar videos. Inténtalo nuevamente.', m);
    await m.react('❌');
  }
}

handler.help = ['ytmp4 <link o nombre>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytv', 'yt'];

export default handler;
