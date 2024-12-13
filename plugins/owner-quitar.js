let handler = async (m, { conn, isRowner }) => {
    const userId = m.sender; 
  
 
    if (m.text.startsWith('/quitar ')) {
    
      const role = m.text.slice(8).trim().split(' ')[0];
      const mentionedUser = m.mentionedJid[0]; 
  
   
      if (!mentionedUser) {
        return m.reply('*Menciona a un usuario*');
      }
  
    
      if (!['mod', 'prem', 'owner'].includes(role)) {
        return m.reply('*Utiliza un rol valido, roles disponibles son: mod, prem, owner.*');
      }
  
   
      const isOwner = global.owner.some(([id]) => id === userId); 
  
      if (role === 'mod') {
        if (global.mods.includes(mentionedUser)) {
          global.mods = global.mods.filter(id => id !== mentionedUser); 
          return m.reply(`*El moderador ha sido removido*`);
        } else {
          return m.reply('*El usuario no es un moderador*');
        }
      }
  
      if (role === 'prem') {
        if (global.prems.includes(mentionedUser)) {
          global.prems = global.prems.filter(id => id !== mentionedUser);
          return m.reply(`*El usuario premium ha sido removido*`);
        } else {
          return m.reply('*Este usuario no es un usuario premium*');
        }
      }
  
      if (role === 'owner') {
        return m.reply('*No puedes remover a un propietario de la lista*');
      }
    }
  };
  
  handler.help = ['quitar <mod/prem>'];
  handler.tags = ['owner'];
  handler.command = ['quitar'];
  handler.rowner = true;
  
  export default handler;
  
