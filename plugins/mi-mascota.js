const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;

    if (!users[userId]?.mascota) {
        return conn.reply(m.chat, `❀ *Aún no tienes una mascota.* Usa /mascota para reclamar una.`, m);
    }

    let mascota = users[userId].mascota;
    let ahora = Date.now();
    let cooldown = 60 * 60 * 1000;
    let tiempoRestante = mascota.ultimoEntrenamiento ? cooldown - (ahora - mascota.ultimoEntrenamiento) : 0;
    let tiempoFaltante = tiempoRestante > 0 ? `${Math.ceil(tiempoRestante / (60 * 1000))} min` : "Disponible";

    let mensaje = `❀ *Tu Mascota*\n\n`;
    mensaje += `❀ *Nombre:* ${mascota.nombre}\n`;
    mensaje += `❀ *Rareza:* ${mascota.rareza}\n`;
    mensaje += `❀ *Nivel:* ${mascota.nivel}\n`;
    mensaje += `❀ *XP:* ${mascota.xp} / ${mascota.xpNecesaria}\n`;
    mensaje += `❀ *Siguiente Entrenamiento:* ${tiempoFaltante}\n`;

    let imagen = mascota.imagen || 'https://qu.ax/xAzJC.jpg';

    await conn.sendFile(m.chat, imagen, 'mascota.jpg', mensaje, m);
};

handler.command = ['mimascota'];
export default handler;
