function handler(m) {
    let numc = '5493876639332';

    let name = conn.getName(`${numc}@s.whatsapp.net`);

    conn.getProfilePicture(`${numc}@s.whatsapp.net`).then(pic => {
        conn.sendContact(m.chat, [[`${numc}@s.whatsapp.net`, `${name}`]], m, {
            thumbnail: pic,
        });
    }).catch(() => {
        conn.sendContact(m.chat, [[`${numc}@s.whatsapp.net`, `${name}`]], m);
    });
}

handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
