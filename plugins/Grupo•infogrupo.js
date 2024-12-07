const handler = async (m, {conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || `${global.icons}`;
  const {antiToxic, reaction, antiTraba, antidelete, antiviewonce, welcome, detect, antiLink, antiLink2, modohorny, autosticker, audios} = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const text = `✦ *ID:*
→ ${groupMetadata.id}
✦ *Nombre:*
→ ${groupMetadata.subject}
✦ *Descripción:*
→ ${groupMetadata.desc?.toString() || 'Sin Descripción'}
✦ *Miembros:*
→ ${participants.length} Participantes
✦ *Creador del Grupo:*
→ @${owner.split('@')[0]}
✦ *Administradores:*
${listAdmin}

✦ *CONFIGURACIÓN*

✧ *Welcome:* ${welcome ? '✅' : '❌'}
✧ *Detect:* ${detect ? '✅' : '❌'}  
✧ *Antilink:* ${antiLink ? '✅' : '❌'} 
✧ *Antilink 𝟸:* ${antiLink2 ? '✅' : '❌'} 
✧ *Modohorny:* ${modohorny ? '✅' : '❌'} 
✧ *Autosticker:* ${autosticker ? '✅' : '❌'} 
✧ *Audios:* ${audios ? '✅' : '❌'} 
✧ *Antiver:* ${antiviewonce ? '✅' : '❌'} 
✧ *Reacción* ${reaction ? "✅️" : "❌️"}
✧ *Delete:* ${antidelete ? '✅' : '❌'} 
✧ *Antitoxic:* ${antiToxic ? '✅' : '❌'} 
✧ *Antitraba:* ${antiTraba ? '✅' : '❌'} 
`.trim();
  conn.sendFile(m.chat, pp, 'img.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['infogrupo'];
handler.tags = ['grupo'];
handler.command = ['infogrupo', 'gp'];
handler.register = false
handler.group = true;
export default handler;
