let handler = async (m, { conn }) => {
  let txt = `*Menu - Moderadores* ✧

> *CREADOR*

*${prefix}otorgar <mod/prem>*
*${prefix}quitar <mod/prem>*
*${prefix}banuser*
*${prefix}unbanuser*
*${prefix}banlist*
*${prefix}banchat*
*${prefix}banlist*
*${prefix}unbanchat_all*

> *BANNER*

*${prefix}getname*
*${prefix}setcurrency*
*${prefix}setdev*
*${prefix}setname*
*${prefix}setwelcome*

> Bყ ✦ ιαɳαʅҽʝαɳԃɾσσƙ15x

*${prefix}copia*
*${prefix}e*
*${prefix}addprem <@tag> <days>*
*${prefix}addxp <@tag> <monto>*
*${prefix}autoadmin*
*${prefix}banuser <@tag>*
*${prefix}unbanuser <@tag>*
*${prefix}broadcast*
*${prefix}bc*
*${prefix}cheat*
*${prefix}cleartmp*
*${prefix}delprem <@tag>*
*${prefix}fetch*
*${prefix}get*
*${prefix}ip <dirección>*
*${prefix}join <link>*
*${prefix}nuevabiobot <txt>*
*${prefix}grupocrear <txt>*
*${prefix}resetperonajes*
*${prefix}restart*
*${prefix}addyenes <@tag>*`.trim();

m.react('💻')
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

  //await conn.sendFile(m.chat, imagen1, 'menu.jpg', txt, m);
  //await conn.sendMini(m.chat, botname, textbot, , img, img, rcanal, estilo)
  await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: botname, body: dev, thumbnailUrl: banner, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
};

handler.help = ['mods'];
handler.tags = ['main'];
handler.command = ['mods'];
handler.mods = true

export default handler;
