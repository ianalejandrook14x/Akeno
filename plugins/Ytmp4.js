import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("❀ Por favor, ingresa el enlace del video de YouTube.");
  }

  // Verificar si el texto es una URL válida de YouTube
  if (!text.includes("youtube.com") && !text.includes("youtu.be")) {
    return m.reply("❀ Por favor, ingresa un enlace válido de YouTube.");
  }

  // Reacción de proceso
  await m.react('🕑');

  try {
    // Llamada a la API para descargar el audio
    let apiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${encodeURIComponent(text)}`;
    let apiResponse = await axios.get(apiUrl);

    // Verificar si la respuesta de la API es exitosa
    if (apiResponse.status !== 200 || !apiResponse.data.status) {
      await m.react('❌');
      return m.reply("❀ La API no devolvió los datos necesarios. Inténtalo nuevamente.");
    }

    // Extraer la URL del audio descargado
    let { download } = apiResponse.data.result;

    // Enviar el audio como archivo
    await conn.sendMessage(m.chat, {
      audio: { url: download.url },
      caption: ``,
      mimetype: "audio/mpeg",
    }, { quoted: m });

    // Reacción de éxito
    await m.react('✅');
  } catch (error) {
    console.error("Error al descargar el audio:", error);

    // Reacción de error
    await m.react('❌');

    // Mensaje de error al usuario
    m.reply("❀ No se pudo descargar el audio. Inténtalo nuevamente.");
  }
};

handler.command = /^(ytmp3)$/i;

export default handler;
