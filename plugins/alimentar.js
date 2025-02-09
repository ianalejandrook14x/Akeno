const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;

    if (!users[userId]?.mascota) {
        return conn.reply(m.chat, `❀ *Todavía no tienes un Pokemón* Usa /pokemon para reclamar uno.`, m);
    }

    let mascota = users[userId].mascota;
    let ahora = Date.now();
    let cooldown = 30 * 60 * 1000;
    let tiempoRestante = mascota.ultimoAlimento ? cooldown - (ahora - mascota.ultimoAlimento) : 0;

    if (tiempoRestante > 0) {
        let minutosFaltantes = Math.ceil(tiempoRestante / (60 * 1000));
        return conn.reply(m.chat, `✿ *Tu pokemón aún no tiene hambre.*\n*Tiempo restante:* ${minutosFaltantes} min`, m);
    }

    let comidas = [
        { nombre: "🥕 Zanahoria", energia: 5, felicidad: 2 },
        { nombre: "🍄 Champiñon", energia: 23, felicidad: 7 },
        { nombre: "🍿 Helado", energia: 33, felicidad: 20 },
        { nombre: "🍪 Galleta", energia: 15, felicidad: 10 },
        { nombre: "🍕 Pizza", energia: 25, felicidad: 14 },
        { nombre: "🍬 Caramelo", energia: 35, felicidad: 28 },
        { nombre: "🍙 Arroz", energia: 13, felicidad: 9 },
        { nombre: "🍫 Chocolate", energia: 40, felicidad: 33 },
        { nombre: "🥗 Ensalada", energia: 17, felicidad: 12 },
        { nombre: "🥧 Pastel", energia: 55, felicidad: 40 },
        { nombre: "🍉 Sandía", energia: 25, felicidad: 24 },
        { nombre: "🥜 Maní", energia: 14, felicidad: 15 },
        { nombre: "🍩 Dona", energia: 28, felicidad: 22 },
        { nombre: "🍒 Cereza", energia: 23, felicidad: 11 },
        { nombre: "🍈 Melón", energia: 18, felicidad: 15 },
        { nombre: "🍊 Mandarina", energia: 19, felicidad: 13 },
        { nombre: "🍍 Ananá", energia: 22, felicidad: 12 },
        { nombre: "🥭 Mango", energia: 27, felicidad: 26 },
        { nombre: "🍐 Pera", energia: 28, felicidad: 23 },
        { nombre: "🍖 Carne", energia: 15, felicidad: 10 },
        { nombre: "🍎 Manzana", energia: 8, felicidad: 5 },
        { nombre: "🥩 Carne", energia: 20, felicidad: 15 },
        { nombre: "🥛 Leche", energia: 10, felicidad: 7 },
    ];
    let comidaElegida = comidas[Math.floor(Math.random() * comidas.length)];

    mascota.energia = Math.min(100, (mascota.energia || 0) + comidaElegida.energia);
    mascota.felicidad = Math.min(100, (mascota.felicidad || 0) + comidaElegida.felicidad);
    mascota.ultimoAlimento = ahora;

    let mensaje = `❀ *Has alimentado a tu Pokemón con ${comidaElegida.nombre}*\n\n`;
    mensaje += `❀ *Felicidad:* +${comidaElegida.felicidad} (Total: ${mascota.felicidad}/100)\n`;
    mensaje += `❀ *Energía:* +${comidaElegida.energia} (Total: ${mascota.energia}/100)\n`;
    mensaje += `❀ *Podrás alimentarla de nuevo en 30 minutos.*`;

    conn.reply(m.chat, mensaje, m);
};

handler.command = ['alimentar'];
export default handler;
