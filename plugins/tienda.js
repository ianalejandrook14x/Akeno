let shopItems = {
    'pocion': { price: 100, effect: 'reduce el tiempo de espera en 50%' },
    'superpocion': { price: 250, effect: 'reduce el tiempo de espera en 75%' },
    'collarxp': { price: 300, effect: 'gana 20% más XP al entrenar' },
    'amuletoraro': { price: 500, effect: 'aumenta la probabilidad de rareza de tu mascota' }
};

let handler = async (m, { conn, args }) => {
    let user = m.sender;
    let wallets = global.db.data.wallets;
    let inventory = global.db.data.inventory || {};
    
    if (!wallets[user]) wallets[user] = { coins: 0 };
    if (!inventory[user]) inventory[user] = [];
    
    let item = args[0]?.toLowerCase();
    if (!item || !shopItems[item]) return conn.reply(m.chat, "*T I E N D A*\n- *pocion (100 monedas)*\n- *superpocion (250 monedas)*\n- *collarxp (300 monedas)*\n- *amuletoraro (500 monedas)*\n\n*Usa: /comprar <item>*", m);
    
    let price = shopItems[item].price;
    if (wallets[user].coins < price) return conn.reply(m.chat, "*No tienes suficiente monedas para realizar la compra*", m);
    
    wallets[user].coins -= price;
    inventory[user].push(item);
    conn.reply(m.chat, `Has comprado ${item}. Efecto: ${shopItems[item].effect}`, m);
};

handler.command = ['comprar'];
export default handler;
