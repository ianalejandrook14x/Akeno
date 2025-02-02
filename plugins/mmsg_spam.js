import fs from 'fs';

const messageLimit = 5;
const messageCount = {};
const blockedUsers = {};
let isActive = false;

const handler = async (m, { conn, args, isOwner }) => {
    if (args[0] === 'restrict') {
        if (!isOwner) {
            global.dfail('rowner', m, conn);
            throw false;
        }

        isActive = !isActive;
    }
};

const isCommand = (m) => {
    return m.text.startsWith('.') || m.text.startsWith('/');
};

const checkSpam = (m) => {
    if (!isActive || m.isGroup) return; 

    if (!isCommand(m)) return;

    const userId = m.sender;

    if (!messageCount[userId]) {
        messageCount[userId] = 0;
    }

    messageCount[userId] += 1;

    if (messageCount[userId] >= messageLimit) {
        if (!blockedUsers[userId]) {
            blockedUsers[userId] = true;
            m.reply(`*El creador restringio los mensajes en privado, seras bloqueado*`);
            conn.blockUser(userId);
        }
    }
};

const resetMessageCount = (m) => {
    if (blockedUsers[m.sender]) return;
    messageCount[m.sender] = 0;
};

export const before = async (m, { conn }) => {
    if (m.isGroup) return true; 

    if (blockedUsers[m.sender]) {
        m.reply('*El creador restringio el uso de comandos, seras bloqueado*');
        return false; 
    }

    checkSpam(m);

    resetMessageCount(m);

    return true;
};

export default handler;
