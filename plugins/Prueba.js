import fetch from "node-fetch";
import yts from "yt-search";
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 50; // Límite de tamaño en MB

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
    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    let q = '128kbps'; // Calidad del audio
    let dl_url = await yt.audio[q].download();
    let size = await yt.audio[q].fileSizeH;

    if (size.split('MB')[0] >= 700) {
      return m.reply("*❀ El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*").then(_ => m.react('✖️'));
    }

    let audioDetails = `
*❀ Información del audio:*

*• Título:* ${title}
*• Duración:* ${timestamp}
*• Visitas:* ${views}
*• Subido:* ${ago}
*• Calidad:* ${q}
*• Tamaño:* ${size}`;

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: audioDetails }, { quoted: m });

    if (size.split('MB')[0] >= limit) {
      await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mp4', fileName: `${title}.m4a` }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mpeg" }, { quoted: m });
    }

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
};

handler.command = /^(ytmp3)$/i;

export default handler;
