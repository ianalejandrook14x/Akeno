import fetch from 'node-fetch';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 94; // Límite de tamaño en MB para enviar como documento M4A

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

    // Obtener información del video usando @bochilteam/scraper
    let yt = await youtubedl(v).catch(async () => await youtubedlv2(v));
    let { title, thumbnail, timestamp, views, ago } = yt;

    // Extraer el audio usando la API
    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${v}`);
    let json = await api.json();
    let { data } = json;
    let { dl: download } = data;

    // Obtener el tamaño del audio usando @bochilteam/scraper
    let audioInfo = yt.audio['128kbps']; // Calidad 128kbps
    let { fileSizeH: size } = audioInfo;

    // Convertir el tamaño a MB
    let sizeMB = parseFloat(size.split('MB')[0]);

    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(_ => m.react('✖️'));
    }

    // Nuevo diseño de la información del audio
    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${size}\n\n`;
    txt += `> *- ↻ El audio se está enviando, espera un momento...*`;

    // Enviar la miniatura y la información del audio
    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    // Enviar el audio según el tamaño
    if (sizeMB >= limit) {
      await star.sendMessage(m.chat, { document: { url: download }, mimetype: 'audio/mp4', fileName: `${title}.m4a` }, { quoted: m });
    } else {
      await star.sendMessage(m.chat, { audio: { url: download }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });
    }

    await m.react('✅'); // Reacción de éxito
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Reacción de error
  }
};

handler.help = ['ytmp3 *<link yt>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta']; // Comandos que activan el handler
// handler.limit = 1; // Límite de uso (opcional)
//handler.register = true;

export default handler;
