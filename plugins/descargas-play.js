import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    
    return conn.sendMessage(m.chat, {
      text: 'Ingresa el nombre de lo que quieres buscar',
      quoted: {
        key: {
          fromMe: false,
          participant: `0@s.whatsapp.net`,
          ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
        },
        message: {
          orderMessage: {
            itemCount: -999999,
            status: 1,
            surface: 1,
            message: 'Akeno', 
            orderTitle: 'Akeno', 
            thumbnail: 'https://qu.ax/GSMZV.jpg', 
            sellerJid: '0@s.whatsapp.net'
          }
        }
      }
    }, { quoted: m });
  }

  await m.react('');
  try {
    let query = args.join(" ");
    let searchApiResponse = await fetch(`https://restapi.apibotwa.biz.id/api/search-yts?message=${encodeURIComponent(query)}`);
    let searchResults = await searchApiResponse.json();

    if (!searchResults.status || !searchResults.data || !searchResults.data.response || !searchResults.data.response.video || !searchResults.data.response.video.length) {
      return conn.reply(m.chat, '*\`No se encontraron resultados para tu búsqueda.\`*', m).then(_ => m.react('✖️'));
    }

    let video = searchResults.data.response.video[0];
    let img = await (await fetch(video.thumbnail)).buffer();

    let txt = `*\`Y O U T U B E - P L A Y\`*\n\n`;
    txt += `• *\`Título:\`* ${video.title}\n`;
    txt += `• *\`Duración:\`* ${parseDuration(video.duration)}\n`;
    txt += `• *\`Canal:\`* ${video.authorName || 'Desconocido'}\n`;
    txt += `• *\`Url:\`* ${video.url}\n\n`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: txt,
      footer: 'Selecciona una opción',
      buttons: [
        {
          buttonId: `.ytmp3 ${video.url}`,
          buttonText: {
            displayText: '✦ Audio',
          },
        },
        {
          buttonId: `.ytmp4 ${video.url}`,
          buttonText: {
            displayText: '✦ Video',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    await m.react('');
  } catch (e) {
    console.error('Error en el handler:', e);
    await m.react('✖️');
    conn.reply(m.chat, '*\`Error al buscar el video. Verifica la consulta o inténtalo de nuevo.\`*', m);
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play', 'play2'];

export default handler;

function parseDuration(duration) {
  let parts = duration.split(':').reverse();
  return parts.reduce((total, part, index) => total + parseInt(part) * Math.pow(60, index), 0);
}
