import { promises as fs } from 'fs';


const haremFilePath = './harem.json';


async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data); 
    } catch (error) {
        throw new Error('No se pudo cargar el archivo harem.json.');
    }
}


let handler = async (m, { conn }) => {
    try {
        const harem = await loadHarem();
        
        
        const userId = m.sender; 

        
        const userHarem = harem[userId];
        if (!userHarem || userHarem.length === 0) {
            await conn.reply(m.chat, 'No tienes personajes reclamados en tu harem.', m);
            return;
        }

        
        let message = '\n';
        userHarem.forEach((character, index) => {
            message += `> *${index + 1}. ${character.name}: ${character.value}*\n`;
    
        });

        
        await conn.sendFile(m.chat, 'https://qu.ax/CjFoL.jpg', 'harem.jpg', message, m);
    } catch (error) {
        await conn.reply(m.chat, `Error al cargar el harem: ${error.message}`, m);
    }
};

// Configuración del comando
handler.help = ['harem'];
handler.tags = ['anime'];
handler.command = /^(harem)$/i; 

export default handler;
