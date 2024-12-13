let handler = async (m, { conn }) => {
  let txt = `*Hola soy ${botname}* ✧

> *BANNER*

*${prefix}getname*
*${prefix}setcurrency*
*${prefix}setdev*
*${prefix}setname*
*${prefix}setwelcome*

> *INFO*

*${prefix}perfil*
*${prefix}menu*
*${prefix}grupos*
*${prefix}blocklist*

> *BUSQUEDAS*

*${prefix}githubsearch*
*${prefix}google <búsqueda>*
*${prefix}npmjs*
*${prefix}tiktoksearch <txt>*
*${prefix}tweetposts*
*${prefix}ytsearch*
*${prefix}imagen <txt>*
*${prefix}pinterest*
*${prefix}play*
*${prefix}playvid*

> *JUEGOS*

*${prefix}abrazar <@tag>*
*${prefix}acertijo*
*${prefix}sonrojarse <@tag>*
*${prefix}consejo*
*${prefix}enamorada <@tag>*
*${prefix}meme*
*${prefix}acariciar <@tag>*
*${prefix}personalidad*
*${prefix}piropo*
*${prefix}pokedex <pokemón>*
*${prefix}pregunta*
*${prefix}dormir <@tag>*
*${prefix}triste <@tag>*
*${prefix}top <txt>*
*${prefix}zodiac <2010 03 15*

> *SUB BOTS*

*${prefix}serbot*
*${prefix}serbot --code*

> *RPG*

*${prefix}bal*
*${prefix}crimen*
*${prefix}daily*
*${prefix}claim*
*${prefix}depositar*
*${prefix}lb*
*${prefix}retirar*
*${prefix}rob2*
*${prefix}rob*
*${prefix}trabajar*
*${prefix}buy*
*${prefix}buy all*

> *STICKERS*

*${prefix}qc*
*${prefix}stiker <img>*
*${prefix}sticker <url>*
*${prefix}take <nombre/autor>*

> *ANIMES*

*${prefix}infoanime*
*${prefix}waifu*
*${prefix}harem*
*${prefix}claim*
*${prefix}rollwaifu*

> *GRUPOS*

*${prefix}link*
*${prefix}grupo open / close*
*${prefix}delete*
*${prefix}demote*
*${prefix}promote*
*${prefix}encuesta <txt / txt>*
*${prefix}hidetag*
*${prefix}infogrupo*
*${prefix}kick*
*${prefix}listadv*
*${prefix}tagall <txt>*
*${prefix}invocar <txt>*

> *ON/OFF*

*${prefix}enable*
*${prefix}disable*

> *DESCARGAS*

*${prefix}facebook - fb*
*${prefix}gitclone <url git>*
*${prefix}imagen <txt>*
*${prefix}instagram - ig*
*${prefix}mediafire*
*${prefix}play3*
*${prefix}play4*
*${prefix}spotify*
*${prefix}tiktok*

> *HERRAMIENTAS*

*${prefix}toanime*
*${prefix}remini*
*${prefix}hd*
*${prefix}enhance*
*${prefix}ssweb*
*${prefix}ss*
*${prefix}trad*

> *AUDIOS*

*${prefix}bass <vn>
*${prefix}blown <vn>
*${prefix}deep <vn>
*${prefix}earrape <vn>
*${prefix}fast <vn>
*${prefix}fat <vn>
*${prefix}nightcore <vn>
*${prefix}reverse <vn>
*${prefix}robot <vn>
*${prefix}slow <vn>
*${prefix}smooth <vn>
*${prefix}tupai <vn>

> *AI*

*${prefix}remini*
*${prefix}hd*
*${prefix}enhance*

> *CONVERTIDORES*

*${prefix}togifaud*
*${prefix}toimg*
*${prefix}tourl*
*${prefix}rovideo*

> *ADMIN*

*${prefix}addprem2 <@tag> <days>
*${prefix}addyen2 <@tag>`.trim();

let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

  //await conn.sendFile(m.chat, imagen1, 'menu.jpg', txt, m);
  //await conn.sendMini(m.chat, botname, textbot, , img, img, rcanal, estilo)
  await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: botname, body: dev, thumbnailUrl: banner, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];

export default handler;
