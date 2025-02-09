const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;

    if (!users[userId]?.mascota) {
        return conn.reply(m.chat, `❀ *Todavía no tienes un Pokemón. Usa /pokemon para reclamar uno.*`, m);
    }

    let mascota = users[userId].mascota;
    let ahora = Date.now();
    let cooldown = 60 * 60 * 1000;

    if (mascota.ultimoEntrenamiento && ahora - mascota.ultimoEntrenamiento < cooldown) {
        let tiempoRestante = cooldown - (ahora - mascota.ultimoEntrenamiento);
        let minutos = Math.ceil(tiempoRestante / (60 * 1000));
        return conn.reply(m.chat, `*Tu Pokemón está cansado Debes esperar \`${minutos}\` Minutos para entrenar de nuevo*`, m);
    }

    let xpAleatoria = [10, 20, 30, 50, 70, 80, 110];
    let xpGanada = xpAleatoria[Math.floor(Math.random() * xpAleatoria.length)];
    
    mascota.xp += xpGanada;
    mascota.ultimoEntrenamiento = ahora;

    let mensaje = `*Tu Pokemón ha entrenado*\n\n`;
    mensaje += `❀ *Nombre:* ${mascota.nombre}\n`;
    mensaje += `❀ *Nivel:* ${mascota.nivel}\n`;
    mensaje += `❀ *Experiencia Ganada:* +${xpGanada} XP\n`;
    mensaje += `❀ *Experiencia Total:* ${mascota.xp} / ${mascota.xpNecesaria}\n`;

    if (mascota.xp >= mascota.xpNecesaria) {
        mascota.xp -= mascota.xpNecesaria;
        mascota.nivel += 1;
        mascota.xpNecesaria = Math.floor(mascota.xpNecesaria * 1.5);
        
        mensaje += `\n*Tu Pokemón subio de nivel ${mascota.nivel}.*`;
    }

    await conn.reply(m.chat, mensaje, m);
};

handler.command = ['entrenar'];
export default handler;
