const handler = async (m, { conn }) => {
    let users = global.db.data.users;
    let userId = m.sender;
    let now = Date.now();

    if (!users[userId]?.mascota) {
        return conn.reply(m.chat, '*No tienes un Pokémon para eliminar.*', m);
    }

    let timestamp = users[userId].mascota.timestamp || 0;

    let tiempoEspera = 30 * 60 * 1000;
    let tiempoRestante = tiempoEspera - (now - timestamp);

    if (tiempoRestante > 0) {
        let minutos = Math.floor(tiempoRestante / (60 * 1000));
        let segundos = Math.floor((tiempoRestante % (60 * 1000)) / 1000);
        return conn.reply(m.chat, `*Todavía no puedes descartar tu Pokémon.*\n\n✦ *Tiempo restante:* ${minutos}m ${segundos}s`, m);
    }

    delete users[userId].mascota;
    conn.reply(m.chat, '❀ *Tu Pokémon ha sido eliminado. Ahora puedes reclamar otro usando `/pokemon`.*', m);
};

handler.command = ['delpokemon'];
export default handler;
