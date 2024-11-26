let handler = async (m, { conn }) => {
    // Usamos global.botname para obtener el nombre actual
    const botName = global.botname || 'Bot';  // Si no se ha configurado, usamos 'Bot' como valor predeterminado
    m.reply(`El nombre actual del bot es: ${botName}`);
  };
  
  handler.command = ['getname'];  // Comando para ver el nombre actual
  
  export default handler;
  