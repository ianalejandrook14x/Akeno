let handler = async (m, { conn }) => {
  let txt = `*Menu - Moderadores* ✧

> *ROLL WAIFU - DESARROLLO*

*adda <name>*
*addc <id> <nombre>*
*alist*
*delete <id> <tag>*
*vote <name>*
*buy*
*ainfo <name>*

> *CREADOR*

*otorgar <mod/prem>*
*quitar <mod/prem>*
*banuser*
*unbanuser*
*banlist*
*banchat*
*banlist*
*unbanchat*
*log_out*

> *BANNER*

*getname*
*setcurrency*
*setdev*
*setname*
*setwelcome*

> Bყ ✦ ιαɳαʅҽʝαɳԃɾσσƙ15x

*copia*
*e*
*addprem <@tag> <days>*
*addxp <@tag> <monto>*
*autoadmin*
*banuser <@tag>*
*unbanuser <@tag>*
*broadcast*
*bc*
*cheat*
*cleartmp*
*delprem <@tag>*
*fetch*
*get*
*ip <dirección>*
*join <link>*
*nuevabiobot <txt>*
*grupocrear <txt>*
*resetperonajes*
*restart*
*addyenes <@tag>*`.trim();

m.react('💻')
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
  await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: botname, body: dev, thumbnailUrl: banner, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
};

handler.help = ['mods'];
handler.tags = ['main'];
handler.command = ['mods'];
handler.mods = true

export default handler;
