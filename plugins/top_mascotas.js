const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let ranking = [];

    for (let userId in users) {
        let user = users[userId];
        if (user.mascota) {
            ranking.push({
                id: userId,
                nombre: user.name || "Desconocido",
                nivel: user.mascota.nivel || 1,
                xp: user.mascota.xp || 0
            });
        }
    }

    ranking.sort((a, b) => b.xp - a.xp);

    let mensaje = "❀ *TOP 10 Mascotas con más XP* ❀\n\n";
    let top10 = ranking.slice(0, 10);
    top10.forEach((user, i) => {
        mensaje += `*${i + 1}.* @${user.id.split('@')[0]} - ✦ *Nivel:* ${user.nivel} | ✧ *XP:* ${user.xp}\n`;
    });

    let miPosicion = ranking.findIndex(user => user.id === m.sender);
    if (miPosicion >= 10) {
        mensaje += `\n❀ *Tu posición:* ${miPosicion + 1} - ✦ *Nivel:* ${ranking[miPosicion].nivel} | ✧ *XP:* ${ranking[miPosicion].xp}`;
    }

    conn.reply(m.chat, mensaje, m, { mentions: top10.map(user => user.id) });
};

handler.command = ['top'];
export default handler;
