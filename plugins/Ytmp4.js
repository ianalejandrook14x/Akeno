import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    return m.reply(`⚠️ Escribe la URL del video que deseas descargar.\n\nUso: ${usedPrefix}ytmp4 [URL del video]`);
  }

  try {
    const videoUrl = text.trim();

    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(videoUrl)) {
      return m.reply('❌ Proporciona una URL válida de YouTube.');
    }

    // Llama a la API para obtener la información del video
    const apiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    // Verifica si la API devolvió un error
    if (!json.success || !json.result?.url) {
      return m.reply('❌ No se pudo descargar el video. La API devolvió un error.');
    }

    const { title, url, thumbnail } = json.result;

    // Muestra la información del video y envía el archivo MP4
    const message = `
*🎬 Título:* ${title}
*🔗 Enlace Original:* ${videoUrl}

⏳ Descargando el video, espera un momento...
    `;

    await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', message, m);

    await conn.sendMessage(
      m.chat,
      {
        video: { url },
        caption: `
*🎬 Título:* ${title}
*📄 Archivo:* ${title}.mp4
        `,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
      },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    m.reply('❌ Ocurrió un error al procesar tu solicitud.');
  }
};

handler.tags = ['descargas'];
handler.help = ['ytmp4'];
handler.command = ['ytmp4', 'ytvideo'];
export default handler;
