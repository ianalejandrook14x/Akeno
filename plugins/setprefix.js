let handler = async (m, { conn, isRowner }) => {
    const newPrefix = m.text.trim().split(' ').slice(1).join(' ');
  
   
    if (!newPrefix) {
      return m.reply('*Proporcione un nuevo prefijo por ejemplo (# / .)*.');
    }
  
   
    global.prefix = newPrefix;  
  
    
    m.reply(*El prefijo del bot de cambio a: ${newPrefix}*);
  
  
  };
  
 
  handler.command = ['setprefix']; 
  handler.mods = true

  export default handler;
