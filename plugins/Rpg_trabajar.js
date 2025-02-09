import fs from 'fs';
import path from 'path';

const WALLET_PATH = path.join(process.cwd(), 'wallets.json');

let handler = async (m, { conn }) => {
    let userId = m.sender;
    let wallets = JSON.parse(fs.readFileSync(WALLET_PATH, 'utf-8'));
    
    if (!wallets.usuarios[userId]) {
        wallets.usuarios[userId] = { monedas: 0, lastWork: 0 };
    }

    let now = Date.now();
    let lastWork = wallets.usuarios[userId].lastWork || 0;
    let cooldown = 30 * 60 * 1000;
    
    if (now - lastWork < cooldown) {
        let remaining = Math.ceil((cooldown - (now - lastWork)) / 60000);
        return conn.reply(m.chat, `*Debes esperar ${remaining} minutos para volver a trabajar.*`, m);
    }
    
    let earnings = [50, 100, 150, 200, 250, 300][Math.floor(Math.random() * 6)];
    wallets.usuarios[userId].monedas += earnings;
    wallets.usuarios[userId].lastWork = now;
    
    fs.writeFileSync(WALLET_PATH, JSON.stringify(wallets, null, 2));
    
    conn.reply(m.chat, `*Haz realizado y te pagaron ${earnings} monedas*`, m);
};

handler.command = ['trabajar'];
export default handler;
