let handler = async (m, { conn, isRowner }) => {
    const newPrefix = m.text.trim().split(' ').slice(1).join(' ');
  
   
    if (!newPrefix) {
      return m.reply('*Proporcione un nuevo prefijo por ejemplo (# / .)*.');
    }
  
   
    global.prefix = newPrefix;  
  
    
    m.reply(`*El prefijo del bot de cambio a: ${newPrefix}*`);
  
  
  };
  
 
  handler.help = ['setprefix'];  
  handler.tags = ['banner'];
  handler.command = ['setprefix']; 
  handler.rowner = true

  export default handler;
  
