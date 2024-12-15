let handler = async (m, { conn, text }) => {
    if (!text) {
      return m.reply('Por favor, indica el valor de experiencia que deseas agregar.');
    }
  
  
    let xpToAdd = parseInt(text);
  
  
    if (isNaN(xpToAdd)) {
      return m.reply('El valor de experiencia debe ser un número válido.');
    }
  
   
    if (!global.db.data.users[m.sender]) {
      global.db.data.users[m.sender] = { exp: 0 };
    }
  
   
    global.db.data.users[m.sender].exp += xpToAdd;
  
   
    m.reply(`Se han agregado ${xpToAdd} Ahora tienes ${global.db.data.users[m.sender].exp} xp.`);
  }
  
  handler.help = ['addxp'];  
  handler.tags = ['owner'];  
  handler.command = ['addxp'];  
  handler.mods = true;
  
  export default handler;
  
