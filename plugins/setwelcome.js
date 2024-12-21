let handler = async (m, { conn, isRowner }) => {
  const newWelcome = m.text.trim().split(' ').slice(1).join(' ');

 
  if (!newTexto) {
    return m.reply('*✦ Proporcione un mensaje de bienvenida*');
  }

 
  global.texto = newTexto;  

  
  m.reply(`*✦ El mensaje de bienvenida fue cambiado*`);


};


handler.help = ['setwelcome'];  
handler.tags = ['banner'];
handler.command = ['setwelcome']; 
handler.isAdmin = true

export default handler;

