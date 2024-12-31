let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `Eliga`
conn.sendMessage(m.chat, {
  image: { url: 'https://qu.ax/MFOVJ.jpg' }, 
  caption: "You like me?", // Título que aparecerá junto a la imagen
  footer: "Sock", 
  buttons: [
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
