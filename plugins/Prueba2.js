import axios from 'axios';
import yts from 'yt-search';

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `౨ৎ ˖ ࣪⊹ 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧 𝐥𝐢𝐧𝐤 𝐨 𝐮𝐧 𝐭𝐢𝐭𝐮𝐥𝐨 𝐝𝐞 𝐲𝐨𝐮𝐭𝐮𝐛𝐞 ✧˚ · .`, m);

  let videoUrl = text;
  let searchResults = null;
  
  
  if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(text)) {
    searchResults = await yts(text);
    if (!searchResults.videos.length) return conn.reply(m.chat, `𐙚˚.ᡣ 𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐫𝐨𝐧 𝐫𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬 ✧`, m);
    videoUrl = searchResults.videos[0].url;
  }

  try {
    let api = await axios.get(`https://mahiru-shiina.vercel.app/download/ytmp4?url=${videoUrl}`);
    let json = api.data;

    let { title, uploaded, duration, views, url, thumbnail, download } = json.data;

    
    let durationParts = duration.split(':').map(Number);
    let durationSeconds = durationParts.length === 3
      ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
      : durationParts[0] * 60 + durationParts[1];

    
    if (durationSeconds > 5400)
      return conn.reply(m.chat, `𐙚˚.ᡣ 𝐄𝐥 𝐯𝐢𝐝𝐞𝐨 𝐞𝐬 𝐝𝐞𝐦𝐚𝐬𝐢𝐚𝐝𝐨 𝐥𝐚𝐫𝐠𝐨 (𝐥í𝐦𝐢𝐭𝐞: 𝟏.𝟑𝟎𝐡)`, m);

    let message = `⋆˙⊹ 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐫 ⊹˖˚  
𓆩✧ 𝐓𝐢𝐭𝐮𝐥𝐨: ${title}  
𓆩✧ 𝐒𝐮𝐛𝐢𝐝𝐨: ${uploaded}  
𓆩✧ 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${duration}  
𓆩✧ 𝐕𝐢𝐬𝐭𝐚𝐬: ${views}  
𓆩✧ 𝐁𝐲 ˚.ᡣ𐭩`;

    let buttons = [
      {
        buttonId: `/ytmp3 ${title}`,
        buttonText: { displayText: '✦ Video' },
      },
      {
        buttonId: `/yts ${text}`,
        buttonText: { displayText: '✦ Más resultados' },
      }
    ];

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: message,
      footer: 'Selecciona una opción',
      buttons,
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });

    
    if (durationSeconds > 420) {
      await conn.sendMessage(m.chat, { document: { url: download }, mimetype: 'video/mp4', fileName: `${title}.mp4` }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { video: { url: download }, mimetype: 'video/mp4' }, { quoted: m });
    }

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `𐙚˚.ᡣ 𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐨𝐛𝐭𝐞𝐧𝐞𝐫 𝐞𝐥 𝐯𝐢𝐝𝐞𝐨. 𝐕𝐮𝐞𝐥𝐯𝐞 𝐚 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞 ✧`, m);
  }
};

HS.command = ['ytmp4'];

export default HS;
