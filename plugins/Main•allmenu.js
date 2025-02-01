
let handler = async (m, { conn }) => {
  let txt = `*Hola 👋🏻, este es el menu completo del bot, aqui se encuentran todos sus comandos disponibles, luego habra mas actualizaciones para tener buena optimización y asi otorgar un buen servicio*

*BOT OFICIAL: +${global.ofcbot}*
 ‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌
 *\`INFO\`*

❀ *perfil*
❀ *menu*
❀ *grupos*

*\`AI\`*

❀ *remini*
❀ *hd*
❀ *enhance*
❀ *wallpaper <txt>*
❀ *gemini / ia*
❀ *pixai*

 *\`BUSQUEDAS\`*

❀ *google <búsqueda>*
❀ *tiktoksearch <txt>*
❀ *ytsearch*
❀ *imagen <txt>*
❀ *play* <musica>
❀ *ytdlmp4* <nombre>
❀ *ytdlmp3* <nombre>


 *\`JUEGOS\`*

❀ *abrazar <@tag>*
❀ *acertijo*
❀ *sonrojarse <@tag>*
❀ *consejo*
❀ *enamorada <@tag>*
❀ *meme*
❀ *acariciar <@tag>*
❀ *personalidad*
❀ *piropo*
❀ *pokedex <pokemón>*
❀ *pregunta*
❀ *dormir <@tag>*
❀ *triste <@tag>*
❀ *top <txt>*
❀ *zodiac <2010 03 15*

 *\`JADI / BOTS\`*

❀ *code* 
❀ *serbot*
❀ *estado*

 *\`RPG\`*

❀ *bal*
❀ *crimen*
❀ *daily*
❀ *claim*
❀ *depositar*
❀ *lb*
❀ *retirar*
❀ *rob2*
❀ *rob*
❀ *trabajar*
❀ *buy*
❀ *buy all*

 *\`STICKERS\`*

❀ *qc*
❀ *stiker <img>*
❀ *sticker <url>*
❀ *take <nombre/autor>*

 *\`+18\`*

❀ *xnxxsearch <txt>*
❀ *xnxxdl <link>*

 *\`ANIMES\`*

❀ *rule34 <tag>*
❀ *waifu*
❀ *hentaisearch <query>*
❀ *hentaidl <link / id>*

 *\`GRUPOS\`*

❀ *link*
❀ *grupo open / close*
❀ *delete*
❀ *demote*
❀ *promote*
❀ *encuesta <txt / txt>*
❀ *hidetag*
❀ *infogrupo*
❀ *kick*
❀ *listadv*
❀ *tagall <txt>*
❀ *invocar <txt>*

 *\`ON/OFF\`*

❀ *enable*
❀ *disable*

 *\`DESCARGAS\`*

❀ *facebook - fb*
❀ *imagen <txt>*
❀ *instagram - ig*
❀ *tiktok*
❀ *ytmp4*
❀ *ytmp3*

 *\`HERRAMIENTAS\`*

❀ *toanime*
❀ *remini*
❀ *hd*
❀ *enhance*
❀ *ssweb*
❀ *ss*
❀ *trad*

 *\`AUDIOS\`*

❀ *bass <vn>*
❀ *blown <vn>*
❀ *deep <vn>*
❀ *earrape <vn>*
❀ *fast <vn>*
❀ *fat <vn>*
❀ *nightcore <vn>*
❀ *reverse <vn>*
❀ *robot <vn>*
❀ *slow <vn>*
❀ *smooth <vn>*
❀ *tupai <vn>*

 *\`CONVERTIDORES\`*

❀ *togifaud*
❀ *toimg*
❀ *toaudio*

 *\`ADMIN\`*

❀ *addprem2 <@tag> <days>*
❀ *addyen2 <@tag>*`.trim();

m.react('✅');
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

await conn.sendMessage(m.chat, {
  text: txt,
  contextInfo: {
    forwardingScore: 999, 
    isForwarded: true, 
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363318758721861@newsletter', 
      newsletterName: namechannel, 
      serverMessageId: -1 
    },
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
handler.command = ['allmenu', 'menu', 'menuall', 'menucompleto'];

export default handler;
