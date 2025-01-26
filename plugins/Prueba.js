import fetch from "node-fetch";
import yts from "yt-search";
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("*❀ Ingresa el texto de lo que quieres buscar*");
  }

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    return m.reply("*❀ Video no encontrado*");
  }

  let { url, title, thumbnail, timestamp, views, ago } = video;

  await m.react('🕓');

  try {
    let ytInfo = await youtubedl(url).catch(async () => await youtubedlv2(url));

    let audioInfo = ytInfo.audio['128kbps'];
    let { quality, fileSizeH, fileSize } = audioInfo;

    if (fileSize > 700 * 1024 * 1024) {
      return m.reply("*❀ El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*").then(_ => m.react('✖️'));
    }

    let audioDetails = `
*❀ Información del audio:*

*• Título:* ${title}
*• Duración:* ${timestamp}
*• Visitas:* ${views}
*• Subido:* ${ago}
*• Calidad:* ${quality}
*• Tamaño:* ${fileSizeH}`;

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: audioDetails }, { quoted: m });

    let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${url}`);
    let json = await api.json();
    let { download } = json.result;

    if (fileSize > 100 * 1024 * 1024) {
      await conn.sendMessage(m.chat, { document: { url: download.url }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { audio: { url: download.url }, mimetype: "audio/mpeg" }, { quoted: m });
    }

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
};

handler.command = /^(ytmp3)$/i;

export default handler;
