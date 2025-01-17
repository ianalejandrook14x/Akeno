import fetch from 'node-fetch';

const handler = async (m, { command, text }) => {
  if (command === 'hentaidl') {
    const query = text.trim();
    if (!query) {
      m.reply('Proporciona un link o ID válido.');
      return;
    }

    const idMatch = query.match(/nhentai\.net\/g\/(\d+)/);
    const id = idMatch ? idMatch[1] : query;

    const apiUrl = `https://delirius-apiofc.vercel.app/anime/nhentai?query=${encodeURIComponent(id)}`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.status && result.data) {
        const hentai = result.data;
        const images = hentai.images.map((image, index) => `${index + 1}: ${image}`).join('\n');

        const message = `
❀ *Título:* ${hentai.title}
❀ *Título Alternativo:* ${hentai.altTitle}
❀ *Páginas:* ${hentai.pages}
❀ *Categorías:* ${hentai.categories.join(', ')}
❀ *Idiomas:* ${hentai.languages.join(', ')}

❀ *Enlace de las imágenes:*
${images}
        `;

        const firstImageUrl = hentai.images[0];
        
        const buttonsMessage = {
          image: { url: firstImageUrl },
          caption: message,
        };

        await m.conn.sendMessage(m.chat, buttonsMessage, { quoted: m });
      } else {
        m.reply('No se encontraron resultados');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      m.reply('Hubo un error al realizar la búsqueda');
    }
  }
};

handler.command = ['hentaidl'];

export default handler;
