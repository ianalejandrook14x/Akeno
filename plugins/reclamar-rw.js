import { promises as fs } from 'fs';


const haremFilePath = './harem.json';


async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('El archivo harem.json no existe. Creando uno nuevo...');
            const emptyHarem = {};
            await saveHarem(emptyHarem);
            return emptyHarem;
        } else {
            throw new Error('Error al cargar el archivo harem.json');
        }
    }
}

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('Error al guardar el archivo harem.json');
    }
}


let handler = async (m, { conn }) => {
    try {
        let character;

      
        if (m.quoted && m.quoted.sender === conn.user.jid) {
            const quotedMessageId = m.quoted.id;

          
            if (!global.lastCharacter || !global.lastCharacter[quotedMessageId]) {
                await conn.reply(m.chat, 'El mensaje al que estás respondiendo no contiene un personaje válido para reclamar.', m);
                return;
            }
            character = global.lastCharacter[quotedMessageId]; 
        } else {
            await conn.reply(m.chat, 'Debes responder a un mensaje con un personaje para reclamarlo.', m);
            return;
        }

        const harem = await loadHarem();

        if (!harem[m.sender]) {
            harem[m.sender] = [];
        }

        if (harem[m.sender].some(c => c.name === character.name)) {
            await conn.reply(m.chat, `Ya has reclamado a ${character.name}.`, m);
            return;
        }

        harem[m.sender].push(character);

        await saveHarem(harem);

        await conn.reply(m.chat, `Has reclamado a ${character.name} con éxito.`, m);

    } catch (error) {
        await conn.reply(m.chat, `Error al reclamar el personaje: ${error.message}`, m);
    }
};

// Configuración del comando
handler.help = ['claim'];
handler.tags = ['anime'];
handler.command = /^(claim|c|reclamar)$/i; // Comandos "claim", "c" y "reclamar"

export default handler;
