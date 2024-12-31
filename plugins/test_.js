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
    },
     {
    buttonId: ".menu", 
    buttonText: { 
      displayText: 'Test ❀' 
    }
  }, {
    buttonId: ".perfil", 
    buttonText: {
      displayText: "Perfil ❀"
    }
  }
],
  viewOnce: true,
  headerType: 1,
}, { quoted: m })
}
handler.command = ['test']
export default handler
