import fs from 'fs';

const tienda = {
    pocion: { precio: 100, descripcion: 'Reduce el tiempo de espera de entrenamiento en 30 minutos.' },
    superpocion: { precio: 250, descripcion: 'Reduce el tiempo de espera de entrenamiento en 1 hora.' },
    collarXp: { precio: 500, descripcion: 'Aumenta la XP ganada en un 20% durante 24 horas.' }
};

const handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let filePath = './wallets.json';
    let wallets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (!wallets[userId]) wallets[userId] = { monedas: 0, items: [] };
    
    if (!args[0]) {
        let mensaje = '*T I E N D A*\n\n';
        for (let item in tienda) {
            mensaje += `✿ *${item}* - ${tienda[item].precio} monedas\n     ${tienda[item].descripcion}\n\n`;
        }
        return conn.reply(m.chat, mensaje, m);
    }

    let item = args[0].toLowerCase();
    if (!tienda[item]) return conn.reply(m.chat, '*El item no es valido \`/tienda\` para ver los artículos disponibles*', m);
    if (wallets[userId].monedas < tienda[item].precio) return conn.reply(m.chat, '*No tienes suficiente monedas*', m);

    wallets[userId].monedas -= tienda[item].precio;
    wallets[userId].items.push(item);
    fs.writeFileSync(filePath, JSON.stringify(wallets, null, 2));

    conn.reply(m.chat, `*Compraste \`${item}\` por ${tienda[item].precio} monedas.`, m);
};

handler.command = ['tienda', 'comprar'];
export default handler;
