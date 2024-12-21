let handler = async (m, { conn }) => {
  let txt = `*Menu - Prem* ✧
*${usedPrefix}mediafire <link>*
*${usedPrefix}pin <txt>*
*${usedPrefix}spotify <txt>*
*${usedPrefix}gitclone <url>*
*${usedPrefix}tovideo*
*${usedPrefix}tourl <pfp>*
*${usedPrefix}githubsearch <url>*
*${usedPrefix}npmjs <txt>*
*${usedPrefix}tweetposts <txt>*
*${usedPrefix}cofre*
*${usedPrefix}infoanime*`.trim();

m.react('✅')
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

  //await conn.sendFile(m.chat, imagen1, 'menu.jpg', txt, m);
  //await conn.sendMini(m.chat, botname, textbot, , img, img, rcanal, estilo)
  await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: botname, body: dev, thumbnailUrl: banner, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
};

handler.help = ['prem'];
handler.tags = ['main'];
handler.command = ['prem'];
handler.mods = true

export default handler;
