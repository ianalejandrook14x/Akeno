const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;

    if (!users[userId]?.mascota) {
        return conn.reply(m.chat, `❀ *Aún no tienes una mascota.* Usa /mascota para reclamar una.`, m);
    }

    let mascota = users[userId].mascota;
    let ahora = Date.now();
    let cooldown = 30 * 60 * 1000;
    let tiempoRestante = mascota.ultimoAlimento ? cooldown - (ahora - mascota.ultimoAlimento) : 0;

    if (tiempoRestante > 0) {
        let minutosFaltantes = Math.ceil(tiempoRestante / (60 * 1000));
        return conn.reply(m.chat, `🐾 *Tu mascota aún no tiene hambre.*\n*Tiempo restante:* ${minutosFaltantes} min`, m);
    }

    let comidas = [
        { nombre: "🥕 Zanahoria", energia: 5, felicidad: 2 },
        { nombre: "🍖 Carne", energia: 15, felicidad: 10 },
        { nombre: "🍎 Manzana", energia: 8, felicidad: 5 },
        { nombre: "🥩 Carne", energia: 20, felicidad: 15 },
        { nombre: "🥛 Leche", energia: 10, felicidad: 7 },
    ];
    let comidaElegida = comidas[Math.floor(Math.random() * comidas.length)];

    mascota.energia = Math.min(100, (mascota.energia || 0) + comidaElegida.energia);
    mascota.felicidad = Math.min(100, (mascota.felicidad || 0) + comidaElegida.felicidad);
    mascota.ultimoAlimento = ahora;

    let mensaje = `❀ *Has alimentado a tu mascota con ${comidaElegida.nombre}*\n\n`;
    mensaje += `❀ *Felicidad:* +${comidaElegida.felicidad} (Total: ${mascota.felicidad}/100)\n`;
    mensaje += `❀ *Energía:* +${comidaElegida.energia} (Total: ${mascota.energia}/100)\n`;
    mensaje += `❀ *Podrás alimentarla de nuevo en 30 minutos.*`;

    conn.reply(m.chat, mensaje, m);
};

handler.command = ['alimentar'];
export default handler;
