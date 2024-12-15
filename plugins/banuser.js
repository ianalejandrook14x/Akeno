import { Client } from 'whatsapp-web.js';
import fs from 'fs';
import path from 'path';


const client = new Client();


let banlist = [];
const banlistPath = path.join(__dirname, 'banlist.json');


if (fs.existsSync(banlistPath)) {
    banlist = JSON.parse(fs.readFileSync(banlistPath));
}


function banUser(userId) {
    if (!banlist.includes(userId)) {
        banlist.push(userId);
        fs.writeFileSync(banlistPath, JSON.stringify(banlist, null, 2));
    }
}


function unbanUser(userId) {
    banlist = banlist.filter(id => id !== userId);
    fs.writeFileSync(banlistPath, JSON.stringify(banlist, null, 2));
}


let handler = async (m, { conn, isRowner }) => {
    const userId = m.sender;

  
    if (banlist.includes(userId)) {
        console.log(`Mensaje de ${userId} ignorado, usuario baneado.`);
        return; // Ignora el mensaje si el usuario está baneado
    }

   
    if (m.text.startsWith('/banuser')) {
        if (!isRowner) {
            m.reply('*Este comando solo puede ser usado por el propietario*');
            return;
        }
        
      
        const mentionedUser = m.mentionedJid[0];
        if (!mentionedUser) {
            m.reply('*Etiquete el usuario*');
            return;
        }
        
        banUser(mentionedUser);
        m.reply(`Usuario ${mentionedUser} ha sido baneado.`);
    }

   
    if (m.text.startsWith('/unbanuser')) {
        if (!isRowner) {
            m.reply('*El comando solicitado solo puede ser usado por el creador*');
            return;
        }

        const mentionedUser = m.mentionedJid[0];
        if (!mentionedUser) {
            m.reply('*Etiqueta al usuario*');
            return;
        }

        unbanUser(mentionedUser);
        m.reply(`Usuario ${mentionedUser} ha sido desbaneado.`);
    }

   
    if (m.text === '/banlist') {
        if (!isRowner) {
            m.reply('*Este comando solo puede ser ejecutado por el creador*');
            return;
        }

        if (banlist.length === 0) {
            m.reply('*No se encontraron usuario baneados*');
        } else {
            m.reply('Lista de baneados:\n' + banlist.join('\n'));
        }
    }
};

// Configuración de ayuda y comandos
handler.help = ['banuser <@tag>', 'unbanuser <@tag>', 'banlist'];
handler.tags = ['owner'];
handler.command = ['banuser', 'unbanuser', 'banlist'];
handler.rowner = true;


client.on('ready', () => {
    console.log('Bot iniciado');
});


client.on('message', async (message) => {
    
    await handler(message, { conn: client, isRowner: message.from === 'adminNumber@c.us' });
});


client.initialize();
