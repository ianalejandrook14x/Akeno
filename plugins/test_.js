let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `Eliga`
conn.sendMessage(m.chat, {
  image: { url: 'https://qu.ax/GKfyo.jpg' }, 
  caption: "Eliga una opción",
  footer: "Powered By ianalejandrook15x", 
  buttons: [
    {
    buttonId: ".menu", 
    buttonText: { 
      displayText: 'Menu ❀' 
    }
  }, {
    buttonId: ".pin Akeno Himejima", 
    buttonText: {
      displayText: "Akeno ❀"
    }
  }
],
  viewOnce: true,
  headerType: 1,
}, { quoted: m })
}
handler.command = ['test']
export default handler
