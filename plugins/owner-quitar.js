let handler = async (m, { conn, isRowner }) => {
    const userId = m.sender; 
  
 
    if (m.text.startsWith('.degrade ')) {
    
      const role = m.text.slice(8).trim().split(' ')[0];
      const mentionedUser = m.mentionedJid[0]; 
  
   
      if (!mentionedUser) {
        return m.reply('*Mentioned the user 🎋*');
      }
  
    
      if (!['mod', 'prem', 'owner'].includes(role)) {
        return m.reply('🎋 *Available roles: mod, prem, creator*');
      }
  
   
      const isOwner = global.owner.some(([id]) => id === userId); 
  
      if (role === 'mod') {
        if (global.mods.includes(mentionedUser)) {
          global.mods = global.mods.filter(id => id !== mentionedUser); 
          return m.reply(`*The moderator has been removed 🎋*`);
        } else {
          return m.reply('*The user is not a moderator 🎋*');
        }
      }
  
      if (role === 'prem') {
        if (global.prems.includes(mentionedUser)) {
          global.prems = global.prems.filter(id => id !== mentionedUser);
          return m.reply(`*Premium user has been removed* 🎋`);
        } else {
          return m.reply('*This user is not a premium user* 🎋');
        }
      }
  
      if (role === 'owner') {
        return m.reply('*You cannot remove an owner from the list* 🎋');
      }
    }
  };
  
  handler.command = ['degrade'];
  handler.rowner = true;
  
  export default handler;
  
