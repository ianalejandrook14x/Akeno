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
      return conn.reply(m.chat, '*No se pudo obtener el video. Verifica la URL e inténtalo de nuevo.*', m).then(_ => m.react('✖️'));
    }

    const title = data.data?.title || 'Sin título'; 
    const image = data.data?.image;
    const download = data.data?.download;

    await conn.sendMessage(m.chat, {
      video: { url: download },
      caption: `✦ *${botname}*`, 
      contextInfo: {
        forwardingScore: 2,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363344288629189@newsletter', 
          newsletterName: 'MULTI-BOT OFC ☁', 
          serverMessageId: -1
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
