import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 100;

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(
      m.chat,
      `✦ *¡Ingresa el texto o enlace del vídeo de YouTube!*\n\n» *Ejemplo:*\n> *${usedPrefix + command}* Canción de ejemplo`,
      m
    );
  }

  await m.react('🕓');

  try {
    let query = args.join(' ');
    let isUrl = query.match(/youtu/gi);

    let video;
    if (isUrl) {
      let ytres = await yts({ videoId: query.split('v=')[1] });
      video = ytres.videos[0];
    } else {
      let ytres = await yts(query);
      video = ytres.videos[0];
      if (!video) {
        return star.reply(m.chat, '✦ *Video no encontrado.*', m).then(() => m.react('✖️'));
      }
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    // Obtener minutos y segundos del timestamp (formato mm:ss)
    let timeParts = timestamp.split(':');
    let minutes = parseInt(timeParts[0]);
    let seconds = parseInt(timeParts[1]);
    let durationInMinutes = minutes + (seconds / 60);

    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    let videoInfo = yt.video['360p'];

    if (!videoInfo) {
      return star.reply(m.chat, '✦ *No se encontró una calidad compatible para el video.*', m).then(() => m.react('✖️'));
    }

    let { fileSizeH: sizeHumanReadable, fileSize } = videoInfo;

    let sizeMB = fileSize / (1024 * 1024);

    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(() => m.react('✖️'));
    }

    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${sizeHumanReadable}\n\n`;

    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;

    if (!data || !data.dl) {
      return star.reply(m.chat, '✦ *Error al obtener el enlace de descarga desde la API.*', m).then(() => m.react('✖️'));
    }

    let { dl: downloadUrl } = data;

    let videoBuffer = await fetch(downloadUrl).then(res => res.buffer());
    let img = await star.resize(thumbnail, 400, 400);

    // Verificar si la duración es mayor de 30 minutos
    if (durationInMinutes > 30) {
      let pageCount = 1;  // El número de páginas en un documento PDF, por ejemplo

      await star.sendMessage(
        m.chat,
        {
          document: videoBuffer,
          mimetype: 'video/mp4',
          fileName: `${title}.mp4`,
          caption: txt,
          img,
          fileLength: videoBuffer.length,
          pageCount
        },
        { quoted: m }
      );
      await m.react('📄'); // Reacción de documento
    } else {
      // Si la duración es menor o igual a 30 minutos, enviar como video normal
      await star.sendMessage(
        m.chat,
        {
          video: { url: downloadUrl },
          caption: txt,
          mimetype: 'video/mp4',
          fileName: `${title}.mp4`
        },
        { quoted: m }
      );
      await m.react('✅'); // Reacción de éxito
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Error durante el proceso
    star.reply(m.chat, '✦ *Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.*', m);
  }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytv'];

export default handler;
