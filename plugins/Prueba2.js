import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(
      m.chat,
      `✦ *¡Ingresa el texto o enlace del vídeo de YouTube!*\n\n» *Ejemplo:*\n> *${usedPrefix + command}* Canción de ejemplo`,
      m
    );
  }

  await m.react('🕓'); // Indicador de proceso

  try {
    let query = args.join(' ');
    let isUrl = query.match(/youtu/gi);

    let video;
    if (isUrl) {
      // Si es un enlace
      let ytres = await yts({ videoId: query.split('v=')[1] });
      video = ytres.videos[0];
    } else {
      // Si es un texto
      let ytres = await yts(query);
      video = ytres.videos[0];
      if (!video) {
        return star.reply(m.chat, '✦ *Video no encontrado.*', m).then(() => m.react('✖️'));
      }
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    // Llamada a la API para descargar el video
    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;

    if (!data || !data.dl || !data.size) {
      return star.reply(m.chat, '✦ *Error al obtener los datos del video desde la API.*', m).then(() => m.react('✖️'));
    }

    let { dl: downloadUrl, size: sizeHumanReadable } = data;
    let sizeInMB = parseFloat(sizeHumanReadable.split(' MB')[0]);

    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${sizeHumanReadable}\n\n`;

    // Enviar la miniatura y detalles
    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    // Enviar el video según el tamaño
    if (sizeInMB > 100) {
      // Enviar como documento si el tamaño supera los 100 MB
      await star.sendMessage(
        m.chat,
        { document: { url: downloadUrl }, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
    } else {
      // Enviar como video normal si es menor a 100 MB
      await star.sendMessage(
        m.chat,
        { video: { url: downloadUrl }, caption: `${title}` },
        { quoted: m }
      );
    }

    await m.react('✅'); // Proceso completado
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Error durante el proceso
    star.reply(m.chat, '✦ *Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.*', m);
  }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytv']; // Comandos disponibles

export default handler;
