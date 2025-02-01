import fs from 'fs';
import { exec } from 'child_process';

const restartInterval = 10 * 60 * 1000; // 10 minutos

function limpiarTemp() {
    const tmpFolder = './tmp';
    if (fs.existsSync(tmpFolder)) {
        fs.readdirSync(tmpFolder).forEach(file => {
            fs.unlinkSync(`${tmpFolder}/${file}`);
        });
    }
}

function reiniciarBot() {
    limpiarTemp();
    exec('pm2 restart all', (err) => {
        if (err) {
            process.exit(1);
        }
        process.exit(0);
    });
}

setInterval(reiniciarBot, restartInterval);

export default {};
