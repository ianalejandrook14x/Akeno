import fs from 'fs';

const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;

    if (users[userId]?.mascota) {
        return conn.reply(m.chat, `❀ *Ya tienes un pokemón y no puedes reclamar otra.*`, m);
    }

    let data = JSON.parse(fs.readFileSync('./mascotas.json'));
    let mascotas = data.mascotas;
    let mascota = mascotas[Math.floor(Math.random() * mascotas.length)];

    users[userId] = users[userId] || {};
    users[userId].mascota = {
        nombre: mascota.nombre,
        rareza: mascota.rareza,
        tipo: mascota.tipo,
        nivel: 1,
        xp: 0,
        xpNecesaria: 100,
        imagen: mascotas.imagen
    };

    let mensaje = `*Has reclamado un Pokemón*\n\n`;
    mensaje += `❀ *Nombre:* ${mascota.nombre}\n`;
    mensaje += `❀ *Rareza:* ${mascota.rareza}\n`;
    mensaje += `❀ *Nivel:* 1 | (0 / 100 XP)\n\n`;

    await conn.sendMessage(m.chat, { image: { url: mascota.imagen }, caption: mensaje }, { quoted: m });
};

handler.command = ['pokemon', 'mascota', 'pokemón'];
export default handler;
