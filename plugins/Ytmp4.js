import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    return m.reply(`⚠️ Escribe la URL del video que deseas descargar.\n\nUso: ${usedPrefix}ytmp3 [URL del video]`);
  }

  try {
    const videoUrl = text.trim();

    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(videoUrl)) {
      return m.reply('❌ Proporciona una URL válida de YouTube.');
    }

    // Llama a la API para obtener la información del audio
    const apiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    // Verifica si la API devolvió un error
    if (!json.status) {
      return m.reply('❌ No se pudo descargar el audio. La API devolvió un error.');
    }

    // Envía el archivo de audio como nota de voz
    const message = `
*🎵 Audio descargado correctamente.*
⏳ Enviando el archivo como nota de voz...
    `;

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: json.result }, // Aquí solo se usa el enlace devuelto por la API
        mimetype: 'audio/mpeg',
        ptt: true, // Indica que se enviará como nota de voz
      },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    m.reply('❌ Ocurrió un error al procesar tu solicitud.');
  }
};

handler.tags = ['descargas'];
handler.help = ['ytmp3'];
handler.command = ['ytmp3', 'ytaudio'];
export default handler;
