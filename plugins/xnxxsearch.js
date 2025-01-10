import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply('*Acción mal usada, ejemplo: xnxxsearch Rusas*');
    return;
  }

  const query = encodeURIComponent(text);
  const apiUrl = `https://delirius-apiofc.vercel.app/search/xnxxsearch?query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply('*Error al realizar la búsqueda.*');
      return;
    }

    let replyMessage = '*Resultados de búsqueda:*\n\n';
    result.data.slice(0, 10).forEach((item, index) => {
      replyMessage += `${index + 1}. ${item.title}\n`;
      replyMessage += `   *Duración:* ${item.duration}\n`;
      replyMessage += `   *Calidad:* ${item.quality}\n`;
      replyMessage += `   *Enlace:* ${item.link}\n\n`;
    });

    m.reply(replyMessage);
  } catch (error) {
    console.error('Error al realizar la solicitud a la API:', error);
    m.reply('Ocurrió un error al obtener los resultados.');
  }
};

handler.command = ['xnxxsearch'];

export default handler;
