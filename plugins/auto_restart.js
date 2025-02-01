import fs from 'fs';
import { exec } from 'child_process';

const restartInterval = 1 * 60 * 1000; // 1 minuto para pruebas

function limpiarTemp() {
    const tmpFolder = './tmp';
    if (fs.existsSync(tmpFolder)) {
        fs.rmSync(tmpFolder, { recursive: true, force: true });
        fs.mkdirSync(tmpFolder);
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

function iniciarReinicio() {
    setTimeout(() => {
        reiniciarBot();
        iniciarReinicio();
    }, restartInterval);
}

iniciarReinicio();

export default {};
