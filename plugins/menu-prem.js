let handler = async (m, { conn }) => {
  let txt = `*Menu - Prem* ✧
*${prefix}mediafire <link>*
*${prefix}pin <txt>
*${prefix}spotify <txt>
*${prefix}gitclone <url>
*${prefix}tovideo
*${prefix}tourl <pfp>
*${prefix}githubsearch <url>
*${prefix}npmjs <txt>
*${prefix}tweetposts <txt>
*${prefix}cofre
*${prefix}infoanime`.trim();

m.react('✅')
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
