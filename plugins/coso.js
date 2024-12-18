import fs from 'fs';
import path from 'path';

const configFolder = path.resolve('./subbots_config');

if (!fs.existsSync(configFolder)) {
  fs.mkdirSync(configFolder);
}

const defaultConfig = {
  setcurrency: 'Yenes',
  setdev: 'Ian',
  setname: 'Aƙҽɳσ Hιɱҽʝιɱα ✦',
  setbanner: 'https://qu.ax/nCFFn.jpg',
  setprefix: '/',
};

const handler = async (m, { args, isOwner }) => {
  const subbotId = m.sender; 

  const configPath = path.join(configFolder, `subbot_${subbotId}.json`);

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    m.reply('Archivo de configuración creado con valores predeterminados.');
  } else {
    m.reply('El archivo de configuración Ya existe.');
  }

  const config = JSON.parse(fs.readFileSync(configPath));

  global.currency = config.setcurrency;
  global.botname = config.setname;
  global.dev = config.setdev;
  global.banner = config.setbanner;
  global.prefix = config.setprefix;
  
};

export default handler;
