import fs from 'fs';  // Usamos fs para manipular archivos
import path from 'path';  // Para manejar rutas de archivos

let handler = async (m, { conn, isRowner }) => {
  try {
   
    const media = await m.quoted.download();

    // Validar que la imagen es válida
    if (!isImageValid(media)) {
      return m.reply('El archivo enviado no es una imagen válida.');
    }

    // Guardar la imagen en una variable global
    global.imagen1 = media;  // Actualiza el banner con la nueva imagen

    // Confirmar que el banner ha sido actualizado correctamente
    m.reply('¡El banner ha sido actualizado correctamente!');

  } catch (error) {
    console.error(error);
    m.reply('Hubo un error al intentar cambiar el banner.');
  }
};

// Función para verificar si un archivo es una imagen válida
const isImageValid = (buffer) => {
  const magicBytes = buffer.slice(0, 4).toString('hex');
  
  // Comprobar si es un archivo JPG
  if (magicBytes === 'ffd8ffe0' || magicBytes === 'ffd8ffe1' || magicBytes === 'ffd8ffe2') {
    return true;
  }

  // Comprobar si es un archivo PNG
  if (magicBytes === '89504e47') {
    return true;
  }

  // Comprobar si es un archivo GIF
  if (magicBytes === '47494638') {
    return true;
  }

  return false;  // No es una imagen válida
};

handler.help = ['setbanner'];  // El comando que se usará para activar esta función
handler.tags = ['banner'];     // La categoría del comando
handler.command = ['setban', 'setbanner'];  // Los posibles comandos que activarán la función

export default handler;
