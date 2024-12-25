import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Ingresa el texto de lo que quieres buscar");
  }

  
  await m.react('🕑');

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    await m.react('❌');
   /* return m.reply("❀ Video no encontrado");*/
  }

  let { url } = video;

  try {
    let api = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`);
    let json = await api.json();
    let { download } = json.result;

    
    await conn.sendMessage(m.chat, {
      audio: { url: download.url },
      caption: ``,
      mimetype: "audio/mpeg",
    }, { quoted: m });

    
    await m.react('✅');
  } catch (error) {
    console.error(error);

    
    await m.react('❌');

   
   m.reply(" No se pudo descargar el audio. Inténtalo nuevamente.");
  }
};

handler.command = /^(ytmp3)$/i;

export default handler;
