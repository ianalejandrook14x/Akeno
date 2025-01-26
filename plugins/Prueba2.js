import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 94;

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(m.chat, `✦ *¡Ingresa el enlace del vídeo de YouTube!*\n\n» *Ejemplo:*\n> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`, m);
  }

  if (!args[0].match(/youtu/gi)) {
    return star.reply(m.chat, '✦ *Verifica que el enlace sea de YouTube.*', m).then(_ => m.react('✖️'));
  }

  await m.react('🕓');

  try {
    let v = args[0];
    let yt = await youtubedl(v).catch(async () => await youtubedlv2(v));
    let { title, thumbnail, timestamp, views, ago } = yt;

    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${v}`);
    let json = await api.json();
    let { result } = json;
    let { download, size } = result;

    size = (size / (1024 * 1024)).toFixed(2);

    if (size >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(_ => m.react('✖️'));
    }

    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${size} MB\n\n`;
  //  txt += `> *- ↻ El vídeo se está enviando, espera un momento...*`;

    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    if (size >= limit) {
      await star.sendMessage(m.chat, { document: { url: download }, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
    } else {
      await star.sendMessage(m.chat, { video: { url: download }, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
    }

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
};

handler.help = ['ytmp4 *<link yt>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'ytv']; 
//handler.register = true;

export default handler;
