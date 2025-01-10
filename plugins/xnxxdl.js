import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply('*Proporciona una URL de video para descargar.*');
    return;
  }

  const apiUrl = `https://delirius-apiofc.vercel.app/download/xnxxdl?url=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply('Error al obtener los enlaces de descarga.');
      return;
    }

    const data = result.data;
    const videoUrl = data.download.high || data.download.low;
    const videoTitle = data.title.replace(/[^a-zA-Z0-9]/g, '_') + '.mp4';

    const videoResponse = await fetch(videoUrl);
    const videoBuffer = await videoResponse.buffer();

    await conn.sendMessage(m.chat, {
      video: videoBuffer,
      caption: `❀ *Título: ${data.title}*\n❀ *Calidad: ${data.quality}*\n❀ *Duración: ${data.duration}*'`,
      fileName: videoTitle,
      mimetype: 'video/mp4'
    });

  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error);
    m.reply('Ocurrió un error al obtener el video.');
  }
};

handler.command = ['xnxxdl'];

export default handler;
