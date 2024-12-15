let handler = async (m, { conn, isRowner }) => {
    const userId = m.sender; 
  
   
    if (m.text.startsWith('/otorgar ')) {
  
      const role = m.text.slice(9).trim().split(' ')[0]; 
      const mentionedUser = m.mentionedJid[0]; 
  

      if (!mentionedUser) {
        return m.reply('*Menciona al usuario*');
      }
  
    
      if (!['mod', 'prem', 'owner'].includes(role)) {
        return m.reply('*Los roles disponibles son: mod, prem, owner*');
      }
  
      
      const isOwner = global.owner.some(([id]) => id === userId);
  

      if (role === 'mod') {
        if (!global.mods.includes(mentionedUser)) {
          global.mods.push(mentionedUser); 
          return m.reply(`*Se ha agregado como moderador*`);
        } else {
          return m.reply('*El usuario ya es moderador*');
        }
      }
  
      if (role === 'prem') {
        if (!global.prems.includes(mentionedUser)) {
          global.prems.push(mentionedUser);
          return m.reply(`*El usuario fue agregado como usuario premium*`);
        } else {
          return m.reply('*El usuario ya es premium*');
        }
      }

      if (role === 'owner') {
        return m.reply('No puedes otorgar el rol de owner a otro usuario');
      }
    }
  };
  
  handler.help = ['otorgar <mod/prem/owner>'];
  handler.tags = ['owner'];
  handler.command = ['otorgar'];
  handler.rowner = true; 
  
  export default handler;
