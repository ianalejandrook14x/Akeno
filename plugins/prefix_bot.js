import fs from 'fs';
import path from 'path';

const basePath = './JadiBot/';

const validPrefixRegex = /^[\p{Emoji}+\*./>]+$/u;

const handler = async (m, { conn, args, isOwner }) => {
    if (!isOwner) return;

    const newPrefix = args[0];

    if (!newPrefix || !validPrefixRegex.test(newPrefix)) {
        return m.reply('*El prefijo no es valido*');
    }

    const botNumber = conn.user.jid.replace(/[^0-9]/g, '');
    const botPath = path.join(basePath, botNumber);
    const prefixFile = path.join(botPath, 'prefix.txt');

    if (!fs.existsSync(botPath)) {
        fs.mkdirSync(botPath, { recursive: true });
    }

    fs.writeFileSync(prefixFile, newPrefix, 'utf-8');

    m.reply(`*Prefijo cambiado: ${newPrefix}*`);
};

export const getPrefix = (botNumber) => {
    const botPath = path.join(basePath, botNumber);
    const prefixFile = path.join(botPath, 'prefix.txt');

    if (fs.existsSync(prefixFile)) {
        return fs.readFileSync(prefixFile, 'utf-8').trim();
    }

    return '.';
};

handler.command = ['setprefix'];
handler.rowner = true;

export default handler;
