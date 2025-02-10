import fs from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
    const pluginsFolder = './plugins';
    
    if (!fs.existsSync(pluginsFolder)) {
        return m.reply('*No se encontró la carpeta de plugins.*');
    }

    try {
        const files = fs.readdirSync(pluginsFolder);
        for (const file of files) {
            const filePath = path.join(pluginsFolder, file);
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        }
        m.reply('*Todos los plugins han sido eliminados.*');
    } catch (error) {
        console.error(error);
        m.reply('*Ocurrió un error al eliminar los plugins.*');
    }
};

handler.customPrefix = /^(DelP)$/i;
handler.command = new RegExp;
handler.rowner = true

export default handler;
