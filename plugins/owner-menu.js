let handler = async (m, { conn }) => {
  let txt = `*Menu - Moderadores* ✧

> *ROLL WAIFU - DESARROLLO*

*${usedPrefix}adda <name>*
*${usedPrefix}addc <id> <nombre>*
*${usedPrefix}alist*
*${usedPrefix}delete <id> <tag>*
*${usedPrefix}vote <name>*
*${usedPrefix}buy*
*${usedPrefix}ainfo <name>*

> *CREADOR*

*${usedPrefix}otorgar <mod/prem>*
*${usedPrefix}quitar <mod/prem>*
*${usedPrefix}banuser*
*${usedPrefix}unbanuser*
*${usedPrefix}banlist*
*${usedPrefix}banchat*
*${usedPrefix}banlist*
*${usedPrefix}unbanchat*

> *BANNER*

*${usedPrefix}getname*
*${usedPrefix}setcurrency*
*${usedPrefix}setdev*
*${usedPrefix}setname*
*${usedPrefix}setwelcome*

> Bყ ✦ ιαɳαʅҽʝαɳԃɾσσƙ15x

*${usedPrefix}copia*
*${usedPrefix}e*
*${usedPrefix}addprem <@tag> <days>*
*${usedPrefix}addxp <@tag> <monto>*
*${usedPrefix}autoadmin*
*${usedPrefix}banuser <@tag>*
*${usedPrefix}unbanuser <@tag>*
*${usedPrefix}broadcast*
*${usedPrefix}bc*
*${usedPrefix}cheat*
*${usedPrefix}cleartmp*
*${usedPrefix}delprem <@tag>*
*${usedPrefix}fetch*
*${usedPrefix}get*
*${usedPrefix}ip <dirección>*
*${usedPrefix}join <link>*
*${usedPrefix}nuevabiobot <txt>*
*${usedPrefix}grupocrear <txt>*
*${usedPrefix}resetperonajes*
*${usedPrefix}restart*
*${usedPrefix}addyenes <@tag>*`.trim();

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
