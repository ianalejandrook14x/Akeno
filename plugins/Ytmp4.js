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

  // Diseño personalizado de envío
  let JT = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363318758721861@newsletter',
        newsletterName: "Nombre del Canal", // Cambia esto por el nombre de tu canal
        serverMessageId: -1,
      },
      externalAdReply: {
        title: title,
        body: "Descarga de audio desde YouTube",
        thumbnailUrl: thumbnail,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };

  // Enviar el mensaje con el diseño personalizado
  await conn.sendMessage(m.chat, { text: HS }, { quoted: m, ...JT });

  try {
    // Llamada a la API para descargar el audio
    let apiUrl = `https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(url)}`;
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
    if (!json.result || !json.result.download || !json.result.download.url) {
      console.error("La respuesta de la API no contiene los datos esperados.");
      return m.reply("❀ La API no devolvió los datos necesarios. Inténtalo nuevamente.");
    }

    // Extraer la URL del audio descargado
    let { download } = json.result;

    // Enviar el audio como archivo
    await conn.sendMessage(m.chat, {
      audio: { url: download.url }, // Usar la URL del audio descargado
      mimetype: "audio/mpeg", // Especificar que es un archivo de audio MP3
    }, { quoted: m });

  } catch (error) {
    console.error("Error al descargar el audio:", error);
    m.reply("❀ No se pudo descargar el audio. Inténtalo nuevamente.");
  }
};

handler.command = /^(ytmp3)$/i;
handler.tags = ['Descargas'];
handler.help = ['ytmp3'];

export default handler;
