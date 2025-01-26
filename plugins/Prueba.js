import fetch from 'node-fetch';
import yts from 'yt-search';

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
    let ytres = await yts(v);
    let video = ytres.videos[0];

    if (!video) {
      return star.reply(m.chat, '✦ *Video no encontrado.*', m).then(_ => m.react('✖️'));
    }

    let { title, thumbnail, timestamp, views, ago } = video;

    let api = await fetch(`https://api.vreden.web.id/api/ytmp3?url=${v}`);
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
   // txt += `> *- ↻ El audio se está enviando, espera un momento...*`;

    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    if (size >= limit) {
      await star.sendMessage(m.chat, { document: { url: download }, mimetype: 'audio/mp4', fileName: `${title}.m4a` }, { quoted: m });
    } else {
      await star.sendMessage(m.chat, { audio: { url: download }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });
    }

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
};

handler.help = ['ytmp3 *<link yt>*'];
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta'];
//handler.register = true;

export default handler;
