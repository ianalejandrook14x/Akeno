let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `*Hola soy ${botname}* ✧

> *INFO*

*perfil*
*menu*
*grupos*
*blocklist*

> *BUSQUEDAS*

*google <búsqueda>*
*tiktoksearch <txt>*
*ytsearch*
*imagen <txt>*
*play*
*play2*


> *JUEGOS*

*abrazar <@tag>*
*acertijo*
*sonrojarse <@tag>*
*consejo*
*enamorada <@tag>*
*meme*
*acariciar <@tag>*
*personalidad*
*piropo*
*pokedex <pokemón>*
*pregunta*
*dormir <@tag>*
*triste <@tag>*
*top <txt>*
*zodiac <2010 03 15*

> *SUB BOTS*

*code* 
*serbot*

> *RPG*

*bal*
*crimen*
*daily*
*claim*
*depositar*
*lb*
*retirar*
*rob2*
*rob*
*trabajar*
*buy*
*buy all*

> *STICKERS*

*qc*
*stiker <img>*
*sticker <url>*
*take <nombre/autor>*

> *ANIMES*

*rule34 <tag>*
*waifu*

> *GRUPOS*

*link*
*grupo open / close*
*delete*
*demote*
*promote*
*encuesta <txt / txt>*
*hidetag*
*infogrupo*
*kick*
*listadv*
*tagall <txt>*
*invocar <txt>*

> *ON/OFF*

*enable*
*disable*

> *DESCARGAS*

*facebook - fb*
*imagen <txt>*
*instagram - ig*
*tiktok*
*ytmp4*
*ytmp3*


> *HERRAMIENTAS*

*toanime*
*remini*
*hd*
*enhance*
*ssweb*
*ss*
*trad*

> *AUDIOS*

*bass <vn>*
*blown <vn>*
*deep <vn>*
*earrape <vn>*
*fast <vn>*
*fat <vn>*
*nightcore <vn>*
*reverse <vn>*
*robot <vn>*
*slow <vn>*
*smooth <vn>*
*tupai <vn>*

> *AI*

*remini*
*hd*
*enhance*

> *CONVERTIDORES*

*togifaud*
*toimg*

> *ADMIN*

*addprem2 <@tag> <days>*
*addyen2 <@tag>*`
conn.sendMessage(m.chat, { text: txt, caption: "1234", footer: wm, buttons: [
  {
    buttonId: ".menu", 
    buttonText: { 
      displayText: 'test' 
    }
  }, {
    buttonId: ".s", 
    buttonText: {
      displayText: "Hola"
    }
  }
],
  viewOnce: true,
  headerType: 1,
}, { quoted: m })
}
handler.command = ['test']
export default handler
