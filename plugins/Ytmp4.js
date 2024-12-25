import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    return m.reply(`⚠️ Escribe la URL del video de YouTube que deseas convertir a audio.\n\nUso: ${usedPrefix}ytmp3 [URL del video]`);
  }

  try {
    const videoUrl = text.trim();

    // Validar que la URL sea de YouTube
    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(videoUrl)) {
      return m.reply('❌ Proporciona una URL válida de YouTube.');
    }

    // Reacción de proceso
    await m.react('🕑');

    // Llamar a la API para descargar el audio
    const apiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    // Verificar si la API devolvió un error
    if (!json.status || !json.result?.download?.url) {
      await m.react('❌');
      return m.reply('❌ No se pudo descargar el audio. La API devolvió un error.');
    }

    const { title, download } = json.result;

    // Enviar el audio como archivo
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: download.url },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
      },
      { quoted: m }
    );

    // Reacción de éxito
    await m.react('✅');
  } catch (err) {
    console.error(err);

    // Reacción de error
    await m.react('❌');

    // Mensaje de error al usuario
    m.reply('❌ Ocurrió un error al procesar tu solicitud.');
  }
};

handler.tags = ['descargas'];
handler.help = ['ytmp3'];
handler.command = ['ytmp3', 'ytaudio'];

export default handler;
