import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, '*\`Ingresa el nombre de lo que quieres buscar\`*', m);

  await m.react('');
  try {
    let res = await search(args.join(" "));
    let video = res[0];
    let img = await (await fetch(video.thumbnail)).buffer();

    let txt = `*\`Y O U T U B E - P L A Y\`*\n\n`;
    txt += `• *\`Título:\`* ${video.title}\n`;
    txt += `• *\`Duración:\`* ${secondString(video.durationS)}\n`;
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
    console.error(e);
    await m.react('');
    conn.reply(m.chat, '*\`Error al buscar el video.\`*', m);
  }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['play'];

export default handler;

async function search(query) {
  let url = `https://restapi.apibotwa.biz.id/api/search-yts?message=${encodeURIComponent(query)}`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function secondString(seconds) {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}
