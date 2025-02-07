import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 94; 

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(m.chat, `✦ *¡Ingresa el texto o enlace del vídeo de YouTube!*\n\n» *Ejemplo:*\n> *${usedPrefix + command}* Canción de ejemplo`, m);
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
        return star.reply(m.chat, '✦ *Video no encontrado.*', m).then(_ => m.react('✖️'));
      }
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    
    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    let audioInfo = yt.audio['128kbps']; 
    let { fileSizeH: size } = audioInfo;

    
    let sizeMB = parseFloat(size.split('MB')[0]);

    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(_ => m.react('✖️'));
    }

    
    let api = await fetch(`https://api.davidcyriltech.my.id/download/ytmp3?url=${url}`);
    let json = await api.json();
    let { data } = json;
    let { dl: download } = data;

    
    let txt = `✦ *Título:* » ${title}\n`;
    txt += `✦ *Duración:* » ${timestamp}\n`;
    txt += `✦ *Visitas:* » ${views}\n`;
    txt += `✦ *Subido:* » ${ago}\n`;
    txt += `✦ *Tamaño:* » ${size}\n\n`;
    

   
    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    
    if (sizeMB >= limit) {
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

handler.help = ['ytmp3'];
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta']; 
// handler.limit = 1; // Límite de uso (opcional)
//handler.register = true;

export default handler;
