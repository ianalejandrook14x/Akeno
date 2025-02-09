import fs from 'fs';

const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;

    if (users[userId]?.mascota) {
        return conn.reply(m.chat, `❀ *Ya tienes un Pokémon y no puedes reclamar otro.*`, m);
    }

    let data = JSON.parse(fs.readFileSync('./mascotas.json'));
    let mascotas = data.mascotas;
    let mascota = mascotas[Math.floor(Math.random() * mascotas.length)];

    users[userId] = users[userId] || {};
    users[userId].mascota = {
        nombre: mascota.nombre,
        tipo: mascota.tipo || "Desconocido",
        rareza: mascota.rareza,
        nivel: 1,
        xp: 0,
        xpNecesaria: 100,
        imagen: mascota.imagen,
        timestamp: Date.now()
    };

    let mensaje = `*Has reclamado un Pokémon*\n\n`;
    mensaje += `❀ *Nombre:* ${mascota.nombre}\n`;
    mensaje += `❀ *Tipo:* ${mascota.tipo || "Desconocido"}\n`;
    mensaje += `❀ *Rareza:* ${mascota.rareza}\n`;
    mensaje += `❀ *Nivel:* 1 | (0 / 100 XP)\n\n`;

    await conn.sendMessage(m.chat, { image: { url: mascota.imagen }, caption: mensaje }, { quoted: m });
};

handler.command = ['pokemon', 'mascota', 'pokemón'];
export default handler;
