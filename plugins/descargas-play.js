import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, '*\`Ingresa el nombre de lo que quieres buscar\`*', m);

  await m.react('');
  try {
    // Realizar la búsqueda
    let res = await search(args.join(" "));
    if (!res || res.length === 0) throw new Error('No se encontraron resultados.');

    // Obtener el primer video de los resultados
    let video = res[0];
    let img = await (await fetch(video.thumbnail)).buffer();

    // Construir el mensaje
    let txt = `*\`Y O U T U B E - P L A Y\`*\n\n`;
    txt += `• *\`Título:\`* ${video.title}\n`;
    txt += `• *\`Duración:\`* ${secondString(video.durationS)}\n`;
    txt += `• *\`Canal:\`* ${video.authorName || 'Desconocido'}\n`;
    txt += `• *\`Url:\`* ${video.url}\n\n`;

    // Enviar el mensaje con botones
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
    await m.react('');
    conn.reply(m.chat, '*\`Error al buscar el video. Verifica la consulta o inténtalo de nuevo.\`*', m);
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;

async function search(query) {
  try {
    let url = `https://restapi.apibotwa.biz.id/api/search-yts?message=${encodeURIComponent(query)}`;
    let response = await fetch(url);

    // Verificar si la respuesta es exitosa
    if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

    // Parsear la respuesta JSON
    let data = await response.json();

    // Verificar si la respuesta tiene el formato esperado
    if (!Array.isArray(data)) throw new Error('La respuesta de la API no es válida.');

    return data;
  } catch (error) {
    console.error('Error en la función search:', error);
    throw error; // Reenviar el error para manejarlo en el handler
  }
}

function secondString(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}
