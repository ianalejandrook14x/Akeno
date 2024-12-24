import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("❀ Ingresa el texto de lo que quieres buscar");
  }

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    return m.reply("❀ Video no encontrado");
  }

  let { title, thumbnail, timestamp, views, ago, url } = video;

  let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

  let HS = `- *Duración:* ${timestamp}
- *Vistas:* ${vistas}
- *Subido:* ${ago}
- *Enlace:* ${url}`;

  let thumb = (await conn.getFile(thumbnail))?.data;

  let JT = {
    contextInfo: {
      externalAdReply: {
        title: title,
        body: "",
        mediaType: 1,
        previewType: 0,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true,
      },
    },
  };

  await conn.reply(m.chat, HS, m, JT);

  try {
    // Usar la nueva API para descargar el video
    let api = await fetch(`https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${url}`);
    let json = await api.json();
    let { download } = json.result;

    // Enviar el video como archivo
    await conn.sendMessage(m.chat, {
      video: { url: download.url }, // Usar la URL del video descargado
      caption: `*${title}*`, // Agregar un título al video
      mimetype: "video/mp4", // Especificar que es un video MP4
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply("❀ No se pudo descargar el video. Inténtalo nuevamente.");
  }
};

handler.command = /^(ytmp4)$/i;

export default handler;
