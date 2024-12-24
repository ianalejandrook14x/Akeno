import fetch from 'node-fetch';
import yts from 'yt-search';

let limit = 100;

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.reply(m.chat, `✦ *Ingrese el nombre de un video de YouTube* o proporcione un enlace.\n\nEjemplo:\n${usedPrefix + command} https://youtu.be/ejemplo\n${usedPrefix + command} nombre del video`, m);

  await m.react('🕒');

  try {
    let query = args.join(' ');

    if (query.startsWith('http') || query.includes('youtu.be') || query.includes('youtube.com')) {
      await handleDownload(m, conn, query, usedPrefix, command);
    } else {
      await handleSearch(m, conn, query, usedPrefix, command);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ha ocurrido un error inesperado. Inténtalo nuevamente más tarde.', m);
    await m.react('❌');
  }
};

async function handleDownload(m, conn, url, usedPrefix, command) {
  try {
    let apiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
    let response = await fetch(apiUrl);

    if (!response.ok) {
      await conn.reply(m.chat, 'Error al obtener el video. Verifica el enlace e intenta nuevamente.', m);
      return await m.react('❌');
    }

    let data = await response.json();
    let sizeMB = data.size / (1024 * 1024);

    if (sizeMB >= limit) {
      await conn.reply(m.chat, `El video pesa más de ${limit} MB, por lo que no se puede enviar.`, m);
      return await m.react('❌');
    }

    await conn.sendMessage(m.chat, {
      video: { url: data.download_url },
      caption: `${data.title}`,
      mimetype: 'video/mp4',
      fileName: `${data.title}.mp4`
    }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Ha ocurrido un error al descargar el video. Inténtalo nuevamente.', m);
    await m.react('❌');
  }
}

async function handleSearch(m, conn, query, usedPrefix, command) {
  try {
    let searchResults = await yts(query);
    let videos = searchResults.videos.slice(0, 5);

    if (videos.length === 0) {
      await conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
      return await m.react('❌');
    }

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
