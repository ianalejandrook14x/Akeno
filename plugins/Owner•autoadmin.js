const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('✧ *Ya eres administrador*');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done)
    let nn = conn.getName(m.sender);
  } catch {
    m.reply('✦ Ocurrio un error.');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
