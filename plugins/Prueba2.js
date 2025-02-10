import axios from 'axios';

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `౨ৎ ˖ ࣪⊹ 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧 𝐥𝐢𝐧𝐤 𝐝𝐞 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 ✧˚ · .`, m);
  
  // Verificar si el enlace es válido
  if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(text))
    return conn.reply(m.chat, `𐙚˚.ᡣ 𝐄𝐧𝐥𝐚𝐜𝐞 𝐧𝐨 𝐯𝐚𝐥𝐢𝐝𝐨, 𝐞𝐬𝐞𝐠𝐮𝐫𝐚𝐭𝐞 𝐝𝐞 𝐪𝐮𝐞 𝐬𝐞𝐚 𝐮𝐧 𝐥𝐢𝐧𝐤 𝐝𝐞 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 ✧`, m);

  try {
    let api = await axios.get(`https://mahiru-shiina.vercel.app/download/ytmp4?url=${text}`);
    let json = api.data;

    let { title, description, uploaded, duration, views, type, url, thumbnail, author, download } = json.data;
    let { name, url: authorUrl } = author;

    // Verificar la duración del video (limite: 10 minutos)
    let durationSeconds = duration.split(':').reduce((acc, time) => (60 * acc) + +time);
    if (durationSeconds > 600) 
      return conn.reply(m.chat, `𐙚˚.ᡣ 𝐄𝐥 𝐯𝐢𝐝𝐞𝐨 𝐞𝐬 𝐝𝐞𝐦𝐚𝐬𝐢𝐚𝐝𝐨 𝐥𝐚𝐫𝐠𝐨 (𝐥𝐢𝐦𝐢𝐭𝐞: 𝟏𝟎 𝐦𝐢𝐧𝐮𝐭𝐨𝐬)`, m);

    let message = `⋆˙⊹ 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐫 ⊹˖˚  
𓆩✧ 𝐓𝐢𝐭𝐮𝐥𝐨: ${title}  
𓆩✧ 𝐀𝐮𝐭𝐨𝐫: [${name}](${authorUrl})  
𓆩✧ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧: ${description || '𝙎𝙞𝙣 𝙙𝙚𝙨𝙘𝙧𝙞𝙥𝙘𝙞𝙤𝙣'}  
𓆩✧ 𝐒𝐮𝐛𝐢𝐝𝐨: ${uploaded}  
𓆩✧ 𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧: ${duration}  
𓆩✧ 𝐕𝐢𝐬𝐭𝐚𝐬: ${views}  
𓆩✧ 𝐁𝐲 𐙚˚.ᡣ𐭩`;

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: message }, { quoted: m });
    await conn.sendMessage(m.chat, { video: { url: download }, mimetype: 'video/mp4' }, { quoted: m });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `𐙚˚.ᡣ 𝐄𝐫𝐫𝐨𝐫 𝐚𝐥 𝐨𝐛𝐭𝐞𝐧𝐞𝐫 𝐞𝐥 𝐯𝐢𝐝𝐞𝐨. 𝐕𝐮𝐞𝐥𝐯𝐞 𝐚 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫 𝐦á𝐬 𝐭𝐚𝐫𝐝𝐞 ✧`, m);
  }
};

HS.command = ['ytmp4'];

export default HS;
