conn.sendMessage(m.chat, {
  image: { url: 'https://qu.ax/MFOVJ.jpg' }, 
  caption: "You like me?", // Título que aparecerá junto a la imagen
  footer: "Sock", 
  buttons: [
    {
      buttonId: ".gay",
      buttonText: {
        displayText: "Yes",
      },
      type: 1, 
    },
    {
      buttonId: ".play2 felices los 4",
      buttonText: {
        displayText: "No",
      },
      type: 1,
    },
  ],
  viewOnce: true,
  headerType: 4, 
}, { quoted: m });
