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

    let durationInMinutes = parseFloat(timestamp.split(':')[0]) * 60 + parseFloat(timestamp.split(':')[1]);

    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${sizeHumanReadable}\n\n`;

    // Obtener enlace de descarga
    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;

    if (!data || !data.dl) {
      return star.reply(m.chat, '✦ *Error al obtener el enlace de descarga desde la API.*', m).then(() => m.react('✖️'));
    }

    let { dl: downloadUrl } = data;

    // Enviar el video como documento con la miniatura
    let videoBuffer = await fetch(downloadUrl).then(res => res.buffer());
    let img = await star.resize(thumbnail, 400, 400); // Redimensionar la miniatura

    // Establecer pageCount a 1 para el archivo de video
    let pageCount = 1; // Un solo "documento" para el video

    await star.sendMessage(
      m.chat,
      {
        document: videoBuffer,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        caption: txt,
        img, // Incluir la miniatura como portada
        fileLength: videoBuffer.length,
        pageCount // Establecer pageCount
      },
      { quoted: m }
    );

    await m.react('✅'); // Reacción de éxito

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
