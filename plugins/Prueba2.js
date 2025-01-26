import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 700; // Tamaño límite en MB

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

    // Información del video usando youtubedl o youtubedlv2 como respaldo
    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    let videoInfo = yt.video['360p'] || yt.video['480p']; // Preferencia por calidad 360p o 480p
    let { fileSizeH: size } = videoInfo;

    let sizeMB = parseFloat(size.split('MB')[0]);

    if (sizeMB >= limit) {
      return star.reply(
        m.chat,
        `✦ *El archivo es demasiado pesado (más de ${limit} MB). Se canceló la descarga.*`,
        m
      ).then(() => m.react('✖️'));
    }

    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;
    let { dl: download } = data;

    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${size}\n\n`;

    // Enviar la miniatura y detalles
    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    // Enviar el video
    if (sizeMB >= limit) {
      await star.sendMessage(
        m.chat,
        { document: { url: download }, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
    } else {
      await star.sendMessage(
        m.chat,
        { video: { url: download }, caption: `${title}` },
        { quoted: m }
      );
    }

    await m.react('✅'); // Proceso completado
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Error durante el proceso
  }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytv']; // Comandos disponibles

export default handler;
