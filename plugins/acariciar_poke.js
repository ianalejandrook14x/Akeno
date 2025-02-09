const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;
    let now = Date.now();

    if (!users[userId]?.mascota) {
        return conn.reply(m.chat, '*No tienes un Pokémon para acariciar. Usa /pokemon para reclamar uno*', m);
    }

    let mascota = users[userId].mascota;
    
    let cooldown = 5 * 60 * 1000;
    let tiempoRestante = mascota.ultimoAcariciar ? cooldown - (now - mascota.ultimoAcariciar) : 0;

    if (tiempoRestante > 0) {
        let minutos = Math.floor(tiempoRestante / (60 * 1000));
        let segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return conn.reply(m.chat, `*Tu Pokémon está feliz debes esperar para volver a acariciarlo*\n\n✦ *Tiempo restante:* ${minutos}m ${segundos}s`, m);
    }

    let xpGanada = Math.floor(Math.random() * 11) + 5;
    mascota.xp += xpGanada;
    mascota.ultimoAcariciar = now;

    let mensaje = `❀ *Acariciaste tu pokemón*\n`;
    mensaje += `*+${xpGanada} XP obtenida*\n`;

    if (mascota.xp >= mascota.xpNecesaria) {
        mascota.nivel += 1;
        mascota.xp = 0;
        mascota.xpNecesaria = Math.floor(mascota.xpNecesaria * 1.2);
        mensaje += `❀ *${mascota.nombre} ha subido al nivel ${mascota.nivel}*\n`;
    }

    conn.reply(m.chat, mensaje, m);
};

handler.command = ['acariciar'];
export default handler;
