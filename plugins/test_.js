let handler = async (m, { conn, args, usedPrefix, command }) => {
let txt = `Prueba de botones`
conn.sendMessage(m.chat, { text: txt, caption: "1234", footer: grupo, buttons: [
  {
    buttonId: ".menu", 
    buttonText: { 
      displayText: 'test' 
    }
  }, {
    buttonId: ".tiktoksearch nakano miku", 
    buttonText: {
      displayText: "test2"
    }
  }
],
  viewOnce: true,
  headerType: 1,
}, { quoted: m })
}
handler.command = ['test']
export default handler
