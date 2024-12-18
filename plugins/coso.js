import fs from 'fs';
import path from 'path';

const subBotsFolder = './subbots_config';

if (!fs.existsSync(subBotsFolder)) {
    fs.mkdirSync(subBotsFolder, { recursive: true });
}

const handler = async (m, { conn }) => {
    const subBotID = m.sender; // Identificar al subbot por el ID del remitente
    const subBotFile = path.join(subBotsFolder, `${subBotID}.json`);

    const defaultConfig = {
        setcurrency: 'Yenes',
        setdev: 'Ian',
        setname: 'ƙҽɳσ Hιɱҽʝιɱα ✦',
        setbanner: 'https://qu.ax/nCFFn.jpg',
        setprefix: '/'
    };

    let config;
    if (fs.existsSync(subBotFile)) {
        config = JSON.parse(fs.readFileSync(subBotFile, 'utf-8'));
    } else {
        config = { ...defaultConfig };
        fs.writeFileSync(subBotFile, JSON.stringify(config, null, 2));
    }

    global.currency = config.setcurrency;
    global.botname = config.setname;
    global.dev = config.setdev;
    global.banner = config.setbanner;
    global.prefix = config.setprefix;
  
    conn.reply(m.chat, `El subbot se ha configurado con éxito.\n\nNombre: ${config.setname}\nDesarrollador: ${config.setdev}\nPrefijo: ${config.setprefix}`, m);
};

export default handler;
