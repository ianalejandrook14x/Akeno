import { Client } from 'whatsapp-web.js';
import fs from 'fs';
import path from 'path';


const client = new Client();


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

   if (m.text.startsWith('/banuser')) {
        const mentionedUser = m.mentionedJid[0];
        if (!mentionedUser) {
            m.reply('*Etiquete el usuario*');
            return;
        }
        
        banUser(mentionedUser);
        m.reply(`Usuario ${mentionedUser} ha sido baneado.`);
    }

   
  if (m.text.startsWith('/unbanuser')) {
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

      if (m.text === '/banlist') {
        if (banlist.length === 0) {
            m.reply('*No se encontraron usuarios baneados*');
        } else {
            m.reply('*Lista de baneados*:\n' + banlist.join('\n'));
        }
    }
};

handler.help = ['banuser <@tag>', 'unbanuser <@tag>', 'banlist'];
handler.tags = ['owner'];
handler.command = ['banuser', 'unbanuser', 'banlist'];
handler.rowner = true;

export default handler
