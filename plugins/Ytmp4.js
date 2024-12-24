import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    return m.reply(`💦 Escribe el nombre del video o la URL que deseas descargar.\n\nUso: ${usedPrefix}ytmp4 nombre del video o URL`);
  }

  try {
    let videoUrl = text;

    if (!/^https?:\/\//.test(text)) {
      const searchApiUrl = `https://api-rin-tohsaka.vercel.app/search/ytsearch?url=${encodeURIComponent(text)}`;
      const searchRes = await fetch(searchApiUrl);
      const searchJson = await searchRes.json();

      if (!searchJson.success || !searchJson.result?.length) {
        return; // No se encontraron resultados
      }

      const video = searchJson.result[0];
      videoUrl = video.url;
    }

    const downloadApiUrl = `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
    const downloadRes = await fetch(downloadApiUrl);
    const downloadJson = await downloadRes.json();

    if (!downloadJson.success || !downloadJson.result?.url) {
      return; // Error en la descarga
    }

    const { url } = downloadJson.result;

    await conn.sendMessage(
      m.chat,
      {
        video: { url },
        mimetype: 'video/mp4',
      },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
  }
};

handler.tags = ['descargas'];
handler.help = ['ytmp4'];
handler.command = ['ytmp4', 'ytvideo'];
export default handler;
