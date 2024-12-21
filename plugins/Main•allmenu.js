let handler = async (m, { conn }) => {
  let txt = `*Hola soy ${botname}* ✧

> *INFO*

*${usedPrefix}perfil*
*${usedPrefix}menu*
*${usedPrefix}grupos*
*${usedPrefix}blocklist*

> *BUSQUEDAS*

*${usedPrefix}google <búsqueda>*
*${usedPrefix}tiktoksearch <txt>*
*${usedPrefix}ytsearch*
*${usedPrefix}imagen <txt>*
*${usedPrefix}play*
*${usedPrefix}play2*
*${usedPrefix}play3*
*${usedPrefix}play4*
*${usedPrefix}playdoc*
*${usedPrefix}playdoc2*

> *JUEGOS*

*${usedPrefix}abrazar <@tag>*
*${usedPrefix}acertijo*
*${usedPrefix}sonrojarse <@tag>*
*${usedPrefix}consejo*
*${usedPrefix}enamorada <@tag>*
*${usedPrefix}meme*
*${usedPrefix}acariciar <@tag>*
*${usedPrefix}personalidad*
*${usedPrefix}piropo*
*${usedPrefix}pokedex <pokemón>*
*${usedPrefix}pregunta*
*${usedPrefix}dormir <@tag>*
*${usedPrefix}triste <@tag>*
*${usedPrefix}top <txt>*
*${usedPrefix}zodiac <2010 03 15*

> *SUB BOTS*

*${usedPrefix}code* 
*${usedPrefix}serbot*

> *RPG*

*${usedPrefix}bal*
*${usedPrefix}crimen*
*${usedPrefix}daily*
*${usedPrefix}claim*
*${usedPrefix}depositar*
*${usedPrefix}lb*
*${usedPrefix}retirar*
*${usedPrefix}rob2*
*${usedPrefix}rob*
*${usedPrefix}trabajar*
*${usedPrefix}buy*
*${usedPrefix}buy all*

> *STICKERS*

*${usedPrefix}qc*
*${usedPrefix}stiker <img>*
*${usedPrefix}sticker <url>*
*${usedPrefix}take <nombre/autor>*

> *ANIMES*

*${usedPrefix}rule34 <tag>*
*${usedPrefix}waifu*

> *GRUPOS*

*${usedPrefix}link*
*${usedPrefix}grupo open / close*
*${usedPrefix}delete*
*${usedPrefix}demote*
*${usedPrefix}promote*
*${usedPrefix}encuesta <txt / txt>*
*${usedPrefix}hidetag*
*${usedPrefix}infogrupo*
*${usedPrefix}kick*
*${usedPrefix}listadv*
*${usedPrefix}tagall <txt>*
*${usedPrefix}invocar <txt>*

> *ON/OFF*

*${usedPrefix}enable*
*${usedPrefix}disable*

> *DESCARGAS*

*${usedPrefix}facebook - fb*
*${usedPrefix}imagen <txt>*
*${usedPrefix}instagram - ig*
*${usedPrefix}tiktok*

> *HERRAMIENTAS*

*${usedPrefix}toanime*
*${usedPrefix}remini*
*${usedPrefix}hd*
*${usedPrefix}enhance*
*${usedPrefix}ssweb*
*${usedPrefix}ss*
*${usedPrefix}trad*

> *AUDIOS*

*${usedPrefix}bass <vn>*
*${usedPrefix}blown <vn>*
*${usedPrefix}deep <vn>*
*${usedPrefix}earrape <vn>*
*${usedPrefix}fast <vn>*
*${usedPrefix}fat <vn>*
*${usedPrefix}nightcore <vn>*
*${usedPrefix}reverse <vn>*
*${usedPrefix}robot <vn>*
*${usedPrefix}slow <vn>*
*${usedPrefix}smooth <vn>*
*${usedPrefix}tupai <vn>*

> *AI*

*${usedPrefix}remini*
*${usedPrefix}hd*
*${usedPrefix}enhance*

> *CONVERTIDORES*

*${usedPrefix}togifaud*
*${usedPrefix}toimg*

> *ADMIN*

*${usedPrefix}addprem2 <@tag> <days>*
*${usedPrefix}addyen2 <@tag>*`.trim();

m.react('✅');
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

await conn.sendMessage(m.chat, {
  text: txt,
  contextInfo: {
    forwardingScore: 999, 
    isForwarded: true,
    rcanal,
    externalAdReply: {
      title: botname, 
      body: dev, 
      thumbnailUrl: banner, 
      mediaType: 1, 
      renderLargerThumbnail: true 
    }
  }
}, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'allmenu', 'help', 'ayuda'];

export default handler;
