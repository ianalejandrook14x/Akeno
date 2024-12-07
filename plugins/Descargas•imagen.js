import {googleImage} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, `*✦ Uso Correcto: ${usedPrefix + command} ${botname}*`, m, );
await m.react(rwait)
conn.reply(m.chat, '✦ *Descargando su imagen...*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: botname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Imagen 1', botname, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Imagen 2', botname, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 3', botname, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 4', botname, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await conn.sendCarousel(m.chat, `✧ Resultado de ${text}`, '✧ Imagen - Descargas', null, messages, m);
await m.react(done)
};
handler.help = ['imagen <query>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image', 'imagen'];
handler.yenes = 5
handler.register = false;
export default handler;
