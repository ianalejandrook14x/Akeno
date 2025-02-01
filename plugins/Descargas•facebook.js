import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*Ingrese algun enlace de Facebook*', m)
  }

  let res;
  try {
    await m.react(rwait);
    res = await igdl(args[0]);
  } catch (e) {
    return conn.reply(m.chat, '*Enlace no valido*', m)
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, 'No se encontraron resultados.', m)
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (e) {
    return conn.reply(m.chat, 'Ocurrio un error al procesar los datos', m)
  }

  if (!data) {
    return conn.reply(m.chat, 'No se encontró una resolución adecuada.', m)
  }

  let video = data.url;
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: '*Facebook | Downloader*', fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m })
    await m.react(done);
  } catch (e) {
    return conn.reply(m.chat, '*Error al enviar el video.*', m)
    await m.react(error);
  }
}

handler.command = ['facebook', 'fb']

export default handler
