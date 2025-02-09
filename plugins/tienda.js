import fs from 'fs';

const tienda = {
    pocion: { precio: 100, descripcion: 'Reduce el tiempo de espera de entrenamiento en 30 minutos.' },
    superpocion: { precio: 250, descripcion: 'Reduce el tiempo de espera de entrenamiento en 1 hora.' },
    collarXp: { precio: 500, descripcion: 'Aumenta la XP ganada en un 20% durante 24 horas.' }
};

const filePath = './wallets.json';

const leerWallets = () => {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const guardarWallets = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const handler = async (m, { conn, args }) => {
    let userId = m.sender;  
    let wallets = leerWallets();

    if (!wallets[userId]) wallets[userId] = { monedas: 0, items: [] };

    if (!args[0]) {
        let mensaje = '*T I E N D A*\n\n';
        for (let item in tienda) {
            mensaje += `✿ *${item}* - ${tienda[item].precio} monedas\n     ${tienda[item].descripcion}\n\n`;
        }
        return conn.reply(m.chat, mensaje, m);
    }

    let item = args[0].toLowerCase();
    if (!tienda[item]) return conn.reply(m.chat, '*El item no es válido. Usa \`/tienda\` para ver los artículos disponibles.*', m);

    let userMonedas = wallets[userId]?.monedas || 0;
    if (userMonedas < tienda[item].precio) return conn.reply(m.chat, '*No tienes suficientes monedas.*', m);

    wallets[userId].monedas -= tienda[item].precio;
    wallets[userId].items.push(item);
    guardarWallets(wallets);

    conn.reply(m.chat, `*Has comprado \`${item}\` por ${tienda[item].precio} monedas.*`, m);
};

handler.command = ['tienda', 'comprar'];
export default handler;
