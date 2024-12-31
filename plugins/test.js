conn.Message(m.chat, {
  image: { url: 'https://qu.ax/GKfyo.jpg'},
  caption: "Eliga alguna opción",
imagen
  footer: "Powered By ianalejandrook15x",
  buttons: [
    {
      buttonId: ".allmenu",
      buttonText: {
        displayText: "Menu",
      },
      type: 1,
    },
    {
      buttonId: ".perfil",
      buttonText: {
        displayText: "Perfil",
     },
      type: 1,
    },
  ],
  viewOnce: true
  headerType: 4,
  }, { quoted: m });

handler.command = ['test2'];
handler.help = ['test2'];

export default handler
