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
        title: title, body: "",
        mediaType: 1, previewType: 0,
        mediaUrl: url, sourceUrl: url,
        thumbnail: thumb, renderLargerThumbnail: true,
      }
    }
  };

  await conn.reply(m.chat, HS, m, JT);

  try {
    // Verificar que la URL del video sea válida
    if (!url || !url.startsWith("https://www.youtube.com/watch?v=")) {
      return m.reply("❀ La URL del video no es válida.");
    }

    // Llamada a la API para descargar el video
    let apiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
    let apiResponse = await fetch(apiUrl);

    // Verificar si la respuesta de la API es exitosa
    if (!apiResponse.ok) {
      console.error(`Error en la API: ${apiResponse.status} - ${apiResponse.statusText}`);
      return m.reply("❀ La API no respondió correctamente. Inténtalo nuevamente.");
    }

    // Convertir la respuesta a JSON
    let json = await apiResponse.json();

    // Depuración: Imprimir la respuesta de la API en la consola
    console.log("Respuesta de la API:", json);

    // Verificar si la respuesta contiene los datos esperados
    if (!json.status || !json.result || !json.result.download || !json.result.download.url) {
      console.error("La respuesta de la API no contiene los datos esperados.");
      return m.reply("❀ La API no devolvió los datos necesarios. Inténtalo nuevamente.");
    }

    // Extraer la URL del video descargado
    let { download } = json.result;

    // Enviar el video como archivo
    await conn.sendMessage(m.chat, {
      video: { url: download.url }, // Usar la URL del video descargado
      caption: `*${title}*`, // Agregar un título al video
      mimetype: "video/mp4", // Especificar que es un video MP4
    }, { quoted: m });

  } catch (error) {
    console.error("Error al descargar el video:", error);
    m.reply("❀ No se pudo descargar el video. Inténtalo nuevamente.");
  }
};

handler.command = /^(playvideo|descargarvideo)$/i; // Cambia el comando según tus necesidades

export default handler;
