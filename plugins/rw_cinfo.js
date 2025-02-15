import fs from 'fs';

const handler = async (m, { args }) => {
    let personajesDB;
    try {
        personajesDB = JSON.parse(fs.readFileSync('./personajes.json', 'utf8'));
    } catch (error) {
        console.error('Error al leer el archivo personajes.json:', error);
        return m.reply('*✧ Hubo un error al cargar la base de datos de personajes.*');
    }

    if (!args[0]) {
        return m.reply('*✧ Proporcione el nombre del personaje*');
    }

    const nombrePersonaje = args.join(' '); 
    let personajeEncontrado = null;

  
    console.log('Personajes cargados:', personajesDB);

  
    for (const anime of personajesDB.animes || []) {
        const personaje = anime.personajes?.find(p => p.name.toLowerCase() === nombrePersonaje.toLowerCase());
        if (personaje) {
            personajeEncontrado = {
                ...personaje,
                anime: anime.name
            };
            break;
        }
    }

    if (!personajeEncontrado) {
        console.log(`Personaje no encontrado: ${nombrePersonaje}`);
        return m.reply(`✧ No se encontró información del personaje *${nombrePersonaje}*.`);
    }

    const estado = personajeEncontrado.estado ? `@${personajeEncontrado.estado}` : 'Libre';
    const mensaje = `
*✧ Información del Personaje ✧*
• *Nombre:* ${personajeEncontrado.name}
• *Anime:* ${personajeEncontrado.anime}
• *Valor:* ${personajeEncontrado.value}
• *Estado:* ${estado}
`;

   
    await m.reply(mensaje);
};

handler.command = ['cinfo'];
export default handler;
