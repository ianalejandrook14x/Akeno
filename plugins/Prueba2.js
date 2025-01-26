import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 94; // Límite de tamaño en MB para enviar como documento MP4

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(m.chat, `✦ *¡Ingresa el enlace del vídeo de YouTube!*\n\n» *Ejemplo:*\n> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`, m);
  }

  if (!args[0].match(/youtu/gi)) {
    return star.reply(m.chat, '✦ *Verifica que el enlace sea de YouTube.*', m).then(_ => m.react('✖️'));
  }

  await m.react('🕓'); // Reacción de espera

  try {
    let v = args[0]; // URL del video

    // Obtener información del video usando yt-search
    let ytres = await yts({ videoId: v.split('v=')[1] });
    let video = ytres.videos[0];

    if (!video) {
      return star.reply(m.chat, '✦ *Video no encontrado.*', m).then(_ => m.react('✖️'));
    }

    let { title, thumbnail, timestamp, views, ago } = video;

    // Obtener el peso del video usando @bochilteam/scraper
    let yt = await youtubedl(v).catch(async () => await youtubedlv2(v));
    let videoInfo = yt.video['360p']; // Calidad 360p
    let { fileSizeH: size } = videoInfo;

    // Convertir el tamaño a MB
    let sizeMB = parseFloat(size.split('MB')[0]);

    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(_ => m.react('✖️'));
    }

    // Extraer el video usando la API
    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${v}`);
    let json = await api.json();
    let { data } = json;
    let { dl: download } = data;

    // Nuevo diseño de la información del video
    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${size}\n\n`;
    txt += `> *- ↻ El video se está enviando, espera un momento...*`;

    // Enviar la miniatura y la información del video
    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    // Enviar el video según el tamaño
    if (sizeMB >= limit) {
      await star.sendMessage(m.chat, { document: { url: download }, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
    } else {
      await star.sendMessage(m.chat, { video: { url: download }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
    }

    await m.react('✅'); // Reacción de éxito
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Reacción de error
  }
};

handler.help = ['ytmp4 *<link yt>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytv']; // Comandos que activan el handler
// handler.limit = 1; // Límite de uso (opcional)
//handler.register = true;

export default handler;
