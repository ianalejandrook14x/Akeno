import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 100; // Límite de tamaño en MB para enviar como documento MP4

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

    // Obtener el peso del video en 360p usando @bochilteam/scraper
    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    let videoInfo = yt.video['360p']; // Calidad 360p

    if (!videoInfo) {
      return star.reply(m.chat, '✦ *No se encontró una calidad compatible para el video.*', m).then(() => m.react('✖️'));
    }

    let { fileSizeH: sizeHumanReadable, fileSize } = videoInfo;

    // Convertir el tamaño a MB
    let sizeMB = fileSize / (1024 * 1024); // Convertir bytes a MB

    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(() => m.react('✖️'));
    }

    // Nuevo diseño de la información del video
    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${sizeHumanReadable}\n\n`;
    txt += `> *- ↻ El video se está enviando, espera un momento...*`;

    // Enviar la miniatura y detalles
    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    // Usar la API para descargar el video
    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;

    if (!data || !data.dl) {
      return star.reply(m.chat, '✦ *Error al obtener el enlace de descarga desde la API.*', m).then(() => m.react('✖️'));
    }

    let { dl: downloadUrl } = data;

    // Enviar el video según el tamaño
    if (sizeMB > limit) {
      // Enviar como documento si el tamaño supera el límite
      await star.sendMessage(
        m.chat,
        { document: { url: downloadUrl }, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
    } else {
      // Enviar como video normal si es menor o igual al límite
      await star.sendMessage(
        m.chat,
        { video: { url: downloadUrl }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` },
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
