import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) return; // No responde si no hay texto

  
  await conn.m.react(m.chat, "🕑", m.key);

  let ytres = await yts(text);
  let video = ytres.videos[0];
  if (!video) return; // No responde si no encuentra video

  let { url } = video;

  try {
    let api = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`);
    let json = await api.json();
    let { download } = json.result;

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: download.url },
        mimetype: "audio/mpeg",
      },
      { quoted: m }
    );

    
    await conn.m.react(m.chat, "✅", m.key);
  } catch (error) {
    console.error(error);
  }
};

handler.command = /^(ytmp3)$/i;
handler.tags = ["Descargas"];
handler.help = ["ytmp3"];

export default handler;
