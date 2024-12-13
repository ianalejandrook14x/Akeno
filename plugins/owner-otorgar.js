let handler = async (m, { conn, isRowner }) => {
    const userId = m.sender; // ID del usuario que envió el mensaje
  
    // Verificamos si el mensaje contiene el comando "/otorgar"
    if (m.text.startsWith('/otorgar ')) {
      // Extraemos el rol que se desea asignar
      const role = m.text.slice(9).trim().split(' ')[0]; // 'mod', 'prem', 'owner'
      const mentionedUser = m.mentionedJid[0]; // Obtenemos al usuario mencionado
  
      // Verificamos que haya mencionado a un usuario
      if (!mentionedUser) {
        return m.reply('*Menciona al usuario*');
      }
  
      // Verificamos que el rol sea válido
      if (!['mod', 'prem', 'owner'].includes(role)) {
        return m.reply('*Los roles disponibles son: mod, prem, owner*');
      }
  
      // Verificamos si quien ejecuta el comando es el creador (owner)
      const isOwner = global.owner.some(([id]) => id === userId); // Comprobamos si el ID del usuario es el del creador
  
      // Asignamos el rol al usuario mencionado
      if (role === 'mod') {
        if (!global.mods.includes(mentionedUser)) {
          global.mods.push(mentionedUser); // Añadir como moderador
          return m.reply(`*Se ha agregado como moderador*`);
        } else {
          return m.reply('*El usuario ya es moderador*');
        }
      }
  
      if (role === 'prem') {
        if (!global.prems.includes(mentionedUser)) {
          global.prems.push(mentionedUser); // Añadir como usuario premium
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
  handler.rowner = true; // Solo el propietario puede usar este comando
  
  export default handler;
