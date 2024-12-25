import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("❀ Ingresa el texto de lo que quieres buscar");
  }

  // Reacción de proceso
  await m.react('🕑');

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    await m.react('❌');
    return m.reply("❀ Video no encontrado");
  }

  let { url } = video;

  try {
    // Llamada a la nueva API para descargar el audio
    let api = await fetch(`https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`);
    let json = await api.json();

    // Verificar si la respuesta contiene los datos esperados
    if (!json.status || !json.result || !json.result.download || !json.result.download.url) {
      await m.react('❌');
      return m.reply("❀ La API no devolvió los datos necesarios. Inténtalo nuevamente.");
    }

    let { download } = json.result;

    // Enviar el audio como archivo
    await conn.sendMessage(m.chat, {
      audio: { url: download.url },
      caption: ``,
      mimetype: "audio/mpeg",
    }, { quoted: m });

    // Reacción de éxito
    await m.react('✅');
  } catch (error) {
    console.error(error);

    // Reacción de error
    await m.react('❌');

    // Mensaje de error al usuario
    m.reply("❀ No se pudo descargar el audio. Inténtalo nuevamente.");
  }
};

handler.command = /^(play)$/i;

export default handler;
