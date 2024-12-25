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
    if (!json.success || !json.result?.url) {
      return m.reply('❌ No se pudo descargar el audio. La API devolvió un error.');
    }

    const { title, url } = json.result;

    // Muestra la información del audio y envía el archivo MP3
    const message = `
*🎵 Título:* ${title}
*🔗 Enlace Original:* ${videoUrl}

⏳ Descargando el audio, espera un momento...
    `;

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });

    await conn.sendMessage(
      m.chat,
      {
        audio: { url },
        caption: `
*🎵 Título:* ${title}
*📄 Archivo:* ${title}.mp3
        `,
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
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
