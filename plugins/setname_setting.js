import fs from 'fs';
import path from 'path';

const basePath = './JadiBot/';

const handler = async (m, { conn, args, isOwner }) => {
    if (!isOwner) return;

    const newName = args.join(' ');
    if (!newName) return m.reply('*Escribe el nombre para el JadiBot*');

    const botNumber = conn.user.jid.replace(/[^0-9]/g, '');
    const botPath = path.join(basePath, botNumber);
    const nameFile = path.join(botPath, 'botname.txt');

    if (!fs.existsSync(botPath)) {
        fs.mkdirSync(botPath, { recursive: true });
    }

    fs.writeFileSync(nameFile, newName, 'utf-8');

    m.reply(`*El nombre fue cambiado a ${newName}*`);
};

export const getBotName = (botNumber) => {
    const botPath = path.join(basePath, botNumber);
    const nameFile = path.join(botPath, 'botname.txt');

    if (fs.existsSync(nameFile)) {
        return fs.readFileSync(nameFile, 'utf-8').trim();
    }

    return global.botname;
};

handler.command = ['setname'];
handler.rowner = true;

export default handler;
