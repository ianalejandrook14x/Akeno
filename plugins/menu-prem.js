let handler = async (m, { conn }) => {
  let txt = `*Menu - Prem* ✧
*mediafire <link>*
*pin <txt>*
*spotify <txt>*
*gitclone <url>*
*tovideo*
*tourl <pfp>*
*githubsearch <url>*
*npmjs <txt>*
*tweetposts <txt>*
*cofre*
*infoanime*`.trim();

m.react('✅')
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
  await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: botname, body: dev, thumbnailUrl: banner, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
};

handler.help = ['prem'];
handler.tags = ['main'];
handler.command = ['prem'];
handler.mods = true

export default handler;
