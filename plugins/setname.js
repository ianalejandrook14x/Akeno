let handler = async (m, { conn, isRowner }) => {
    const newName = m.text.trim().split(' ').slice(1).join(' ');
  
   
    if (!newName) {
      return m.reply('*Proporciona un nuevo nombre para el bot ✦*');
    }
  
   
    global.botname = newName;  
  
    
    m.reply(`*El nombre a sido actualizado a: ${newName} ✦*`);
  
  
  };
  
 
  handler.help = ['setname'];  
  handler.tags = ['banner'];
  handler.command = ['setname']; 
  handler.mods = true

  export default handler;
  
