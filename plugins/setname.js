let handler = async (m, { conn, isRowner }) => {
    const newName = m.text.trim().split(' ').slice(1).join(' ');
  
    // Si no se proporcionó un nombre
    if (!newName) {
      return m.reply('Por favor, proporciona un nuevo nombre para el bot.');
    }
  
    // Actualizamos el nombre del bot en la variable global
    global.botname = newName;  // Cambia el nombre globalmente
  
    // Confirmamos que el nombre se ha actualizado
    m.reply(`¡El nombre del bot ha sido actualizado a: ${newName}!`);
  
    // Mostrar el nombre actualizado (puedes agregar más lógica aquí si es necesario)
  };
  
  // Detalles del comando
  handler.help = ['setname'];  // Comando para cambiar el nombre
  handler.tags = ['banner']; // Etiqueta para agrupar los comandos
  handler.command = ['setname'];  // Comando específico
  
  export default handler;
  