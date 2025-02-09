const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;
    let now = Date.now();

    if (!users[userId]?.mascota) {
        return conn.reply(m.chat, '*No tienes un Pokémon para eliminar.*', m);
    }

    let tiempoEspera = 12 * 60 * 60 * 1000;
    let tiempoRestante = tiempoEspera - (now - users[userId].mascota.timestamp);

    if (tiempoRestante > 0) {
        let horas = Math.floor(tiempoRestante / (60 * 60 * 1000));
        let minutos = Math.floor((tiempoRestante % (60 * 60 * 1000)) / (60 * 1000));
        return conn.reply(m.chat, `*Todavía no puedes descartar tu Pokémon.*\n\n✦ *Tiempo restante:* ${horas}h ${minutos}m`, m);
    }

    delete users[userId].mascota;
    conn.reply(m.chat, '❀ *Tu Pokémon ha sido eliminado. Ahora puedes reclamar otro usando `/pokemon`.*', m);
};

handler.command = ['delpokemon'];
export default handler;
