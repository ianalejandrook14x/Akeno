let handler = async (m, { conn }) => {
    const botName = global.botname || 'Bot'; 
    m.reply(`El nombre actual del bot es: ${botName}`);
  };
  
handler.command = ['getname']; 
handler.help = ['getname']
handler.tags = ['banner']
handler.command = ['getname', 'getnamebot', 'botname']
  
  export default handler;
  
