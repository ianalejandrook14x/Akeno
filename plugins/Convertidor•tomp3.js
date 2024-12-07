import {toAudio} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';
  if (!/video|audio/.test(mime)) throw `*✧ Responda a algun video o nota de voz*`;
  const media = await q.download();
  const audio = await toAudio(media, 'mp4');
  if (!audio.data) throw '*✧ Lo lamento, ocurrio un error*';
  conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};
handler.alias = ['tomp3', 'toaudio'];
handler.command = ['tomp3', 'toaudio'];
export default handler;
