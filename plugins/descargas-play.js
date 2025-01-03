import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  let username = m.pushName || 'User';
  let pp = 'https://qu.ax/hMOxx.jpg';
  let thumbnail = await (await fetch(pp)).buffer();

  if (!args[0]) {
    let txt = `✦ *Ingresa el nombre de lo que quieres buscar @${username}*\n\n✦ *Ejemplo*: /play Akeno`;

    const anu = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net"
      },
      message: {
        groupInviteMessage: {
          groupJid: "6285240750713-1610340626@g.us",
          inviteCode: "mememteeeekkeke",
          groupName: "P",
          caption: "Akeno",
          jpegThumbnail: thumbnail
        }
      }
    };

    return conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318758721861@newsletter',
          newsletterName: '✦ Akeno channel',
          serverMessageId: -1
        },
        externalAdReply: {
          title: 'Uso incorrecto',
          body: 'Youtube play',
          thumbnailUrl: pp
        }
      }
    }, { quoted: anu });
  }

  await m.react('');
  try {
    let query = args.join(" ");
    let searchApiResponse = await fetch(`https://restapi.apibotwa.biz.id/api/search-yts?message=${encodeURIComponent(query)}`);
    let searchResults = await searchApiResponse.json();

    if (!searchResults.status || !searchResults.data || !searchResults.data.response || !searchResults.data.response.video || !searchResults.data.response.video.length) {
      const anu = {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "0@s.whatsapp.net"
        },
        message: {
          groupInviteMessage: {
            groupJid: "6285240750713-1610340626@g.us",
            inviteCode: "mememteeeekkeke",
            groupName: "P",
            caption: "No se encontraron resultados",
            jpegThumbnail: thumbnail
          }
        }
      };

      return conn.sendMessage(m.chat, {
        text: `No se encontraron resultados, ${username}.`,
        quoted: anu
      }, { quoted: anu }).then(_ => m.react('✖️'));
    }

    let video = searchResults.data.response.video[0];
    let videoImg = await (await fetch(video.thumbnail)).buffer();

    let txt = `*\`Y O U T U B E - P L A Y\`*\n\n`;
    txt += `• *\`Título:\`* ${video.title}\n`;
    txt += `• *\`Duración:\`* ${parseDuration(video.duration)}\n`;
    txt += `• *\`Canal:\`* ${video.authorName || 'Desconocido'}\n`;
    txt += `• *\`Url:\`* ${video.url}\n\n`;

    await conn.sendMessage(m.chat, {
      image: videoImg,
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

    const anu = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net"
      },
      message: {
        groupInviteMessage: {
          groupJid: "6285240750713-1610340626@g.us",
          inviteCode: "mememteeeekkeke",
          groupName: "P",
          caption: "Error al buscar el video",
          jpegThumbnail: thumbnail
        }
      }
    };

    conn.sendMessage(m.chat, {
      text: `Error al buscar el video, ${username}. Verifica la consulta o inténtalo de nuevo.`,
      quoted: anu
    }, { quoted: anu });
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
