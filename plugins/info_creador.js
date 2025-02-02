function handler(m) {
    let numcr = '5493876639332';
    let name = conn.getName(`${numcr}@s.whatsapp.net`);

    conn.profilePictureUrl(`${numcr}@s.whatsapp.net`, 'image').then(pic => {
        conn.sendContact(m.chat, [[`${numcr}@s.whatsapp.net`, `${name}`]], m, {
            thumbnail: pic,
        });
    }).catch(() => {
        conn.sendContact(m.chat, [[`${numcr}@s.whatsapp.net`, `${name}`]], m);
    });
}

handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
