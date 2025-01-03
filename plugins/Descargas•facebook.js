import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '✦ *Ingresa la URL de un video de Facebook.*\n\n✦ *Ejemplo*: /fb https://www.facebook.com/...', m);
  }

  let url = args[0];
  let apiUrl = `https://api-rin-tohsaka.vercel.app/download/facebook?url=${encodeURIComponent(url)}`;

  try {
    await m.react('🕓'); 

    let response = await fetch(apiUrl);
    let data = await response.json();

    if (!data.status || !data.data) {
      return conn.reply(m.chat, '✦ *No se pudo obtener el video. Verifica la URL e inténtalo de nuevo.*', m).then(_ => m.react('✖️'));
    }

    let { title, image, download } = data.data;

    await conn.sendMessage(m.chat, {
      video: { url: download },
      caption: `✦ *Título*: ${title || 'Sin título'}\n✦ *Descarga*: ${download}`,
      thumbnail: await (await fetch(image)).buffer(),
      contextInfo: {
        externalAdReply: {
          title: 'Facebook Video Downloader',
          body: '¡Video descargado con éxito!',
          thumbnail: await (await fetch(image)).buffer(),
          mediaType: 2,
          mediaUrl: download,
          sourceUrl: download
        }
      }
    }, { quoted: m });

    await m.react('✅'); 
  } catch (e) {
    console.error('Error en el handler:', e);
    await m.react('✖️'); 
    conn.reply(m.chat, '✦ *Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.*', m);
  }
};

handler.help = ['fb <url>'];
handler.tags = ['downloader'];
handler.command = ['fb', 'facebook'];

export default handler;
