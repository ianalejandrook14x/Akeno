import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) return; // No responde si no hay texto

  
  await m.react('🕑');

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    await m.react('❌');
    return;
  }

  let { url } = video;

  try {
    
    let api = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(url)}`);
    let json = await api.json();

    
    if (!json.result || !json.result.download || !json.result.download.url) {
      await m.react('❌');
      return;
    }

    let { download } = json.result;

    
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: download.url },
        mimetype: "audio/mpeg",
      },
      { quoted: m }
    );

    
    await m.react('✅');
  } catch (error) {
    console.error("Error al descargar el audio:", error);

    // Reacción de error
    await m.react('❌');
  }
};

handler.command = /^(ytmp3)$/i;

export default handler;
