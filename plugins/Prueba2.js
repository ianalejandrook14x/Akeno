import fetch from 'node-fetch';
import yts from 'yt-search';

let limit = 100; // Límite de tamaño en MB

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(m.chat, `✦ *¡Ingresa el texto o enlace del vídeo de YouTube!*\n\n» *Ejemplo:*\n> *${usedPrefix + command}* Canción de ejemplo`, m);
  }

  await m.react('🕓'); // Reacción de espera

  try {
    let query = args.join(' ');
    let isUrl = query.match(/youtu/gi);

    let video;
    if (isUrl) {
      // Si es un enlace, obtener información directamente
      let ytres = await yts({ videoId: query.split('v=')[1] });
      video = ytres.videos[0];
    } else {
      // Si es un texto, buscar en YouTube
      let ytres = await yts(query);
      video = ytres.videos[0];
      if (!video) {
        return star.reply(m.chat, '✦ *Video no encontrado.*', m).then(_ => m.react('✖️'));
      }
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    // Obtener el vídeo usando la API
    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { result } = json;
    let { download, size } = result;

    size = (size / (1024 * 1024)).toFixed(2); // Convertir a MB

    if (size >= limit) {
      return star.reply(m.chat, `✦ *El archivo pesa más de ${limit} MB, se canceló la descarga.*`, m).then(_ => m.react('✖️'));
    }

    // Nuevo diseño de la información del video
    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${size} MB\n\n`;
    txt += `> *- ↻ El video se está enviando, espera un momento...*`;

    // Enviar la miniatura y la información del video
    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    // Enviar el video
    await star.sendMessage(m.chat, { video: { url: download }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });

    await m.react('✅'); // Reacción de éxito
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Reacción de error
  }
};

handler.help = ['ytmp4 *<texto o link yt>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytv', 'yt']; // Comandos que activan el handler
// handler.limit = 1; // Límite de uso (opcional)
//handler.register = true;

export default handler;
