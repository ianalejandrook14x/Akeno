function handler(m) {
    let numc = '+5493876639332';
    let name = conn.getName(`${numc}@s.whatsapp.net`);
    let ownerN = `${numc}`;
  
    conn.sendContact(m.chat, [[`${ownerN}@s.whatsapp.net`, `${name}`]], m);
}

handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
