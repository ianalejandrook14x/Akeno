import { promises as fs } from 'fs';
import fetch from 'node-fetch';

const charactersUrl = 'https://raw.githubusercontent.com/ianalejandrook15x/AkariBot-MD/refs/heads/main/personajes.json';

async function loadCharacters() {
    try {
        const res = await fetch(charactersUrl);
        const characters = await res.json();
        return characters;
    } catch (error) {
        throw new Error('No se pudo cargar el archivo characters.json desde GitHub.');
    }
}

let handler = async (m, { conn }) => {
    try {
        const characters = await loadCharacters();
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

        const message = `
❀ *Nombre*: ${randomCharacter.name}

❀ *Edad*: ${randomCharacter.age}

❀ *Valor*: ${randomCharacter.value}

❀ *Origen*: ${randomCharacter.source}

❀ *Dueño*: 
        `;

       
        const sentMsg = await conn.sendFile(m.chat, randomCharacter.img, `${randomCharacter.name}.jpg`, message, m);

        
        if (!global.lastCharacter) global.lastCharacter = {};
        global.lastCharacter[sentMsg.key.id] = randomCharacter; 

    } catch (error) {
        await conn.reply(m.chat, `Error al cargar el personaje: ${error.message}`, m);
    }
};


handler.help = ['rw', 'rollwaifu'];
handler.tags = ['anime'];
handler.command = /^(rw|rollwaifu)$/i;

export default handler;
