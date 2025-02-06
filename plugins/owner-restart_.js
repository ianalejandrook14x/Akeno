import { exec } from 'child_process';

const handler = async (m, { conn }) => {
    m.reply('*Ejecutando reinicio.*');
    
    exec('pm2 restart all', (err) => {
        if (err) {
            process.exit(1);
        }
        process.exit(0);
    });
};

handler.command = ['restart'];
handler.rowner = true;

export default handler;
