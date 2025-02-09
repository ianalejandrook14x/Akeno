let handler = async (m, { conn, isRowner }) => {
    const userId = m.sender; 
  
   
    if (m.text.startsWith('/role ')) {
  
      const role = m.text.slice(9).trim().split(' ')[0]; 
      const mentionedUser = m.mentionedJid[0]; 
  

      if (!mentionedUser) {
        return m.reply('*Mentioned the user* 🎋');
      }
  
    
      if (!['mod', 'prem', 'owner'].includes(role)) {
        return m.reply('*Available roles are: mod, prem, owner* 🎋');
      }
  
      
      const isOwner = global.owner.some(([id]) => id === userId);
  

      if (role === 'mod') {
        if (!global.mods.includes(mentionedUser)) {
          global.mods.push(mentionedUser); 
          return m.reply(`*Has been added as a moderator* 🎋`);
        } else {
          return m.reply('*The user is already a moderator* 🎋');
        }
      }
  
      if (role === 'prem') {
        if (!global.prems.includes(mentionedUser)) {
          global.prems.push(mentionedUser);
          return m.reply(`*User was added as a premium user* 🎋`);
        } else {
          return m.reply('*The user is already premium* 🎋');
        }
      }

      if (role === 'owner') {
        return m.reply('You cannot grant the owner role to another user 🎋');
      }
    }
  };
  
  handler.command = ['role'];

  handler.rowner = true; 
  
  export default handler;
