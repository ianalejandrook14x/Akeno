import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  
  if (!m.messageStubType || !m.isGroup) return !0;

  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => welcome);
  let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => adios);

  
  let img = await (await fetch(`${pp}`)).buffer();
  let img2 = await (await fetch(`${pp2}`)).buffer();

  
  let chat = global.db.data.chats[m.chat];

  
  if (chat.welcome && m.messageStubType == 27) {
    
    let groupName = groupMetadata.subject || 'este grupo';

   
    let groupRules = chat.rules || 'No hay reglas definidas.';

    
    let welcome = `*Hola @${m.messageStubParameters[0].split('@')[0]}* ✦\n\nBienvenido al grupo *${groupName}*.\n\nLee las reglas del grupo:\n\n${groupRules}`;

    
    await conn.sendMessage(m.chat, {
      text: welcome,
      mentions: [m.messageStubParameters[0]] 
    }, { quoted: m });
  }
}
