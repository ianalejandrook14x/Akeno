let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `Eliga`
conn.sendMessage(m.chat, {
  image: { url: 'https://qu.ax/GKfyo.jpg' }, 
  caption: "*Eliga una opción*",
  footer: "Powered By ianalejandrook15x", 
  buttons: [
    {
    buttonId: ".allmenu", 
    buttonText: { 
      displayText: 'Menu ❀' 
    }
  }, {
    buttonId: ".code", 
    buttonText: {
      displayText: "Serbot ❀"
    }
  }
],
  viewOnce: true,
  headerType: 1,
}, { quoted: m })
}
handler.command = ['menu']
export default handler
