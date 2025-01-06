import fs from 'fs';

const saveSubbots = () => {
  fs.writeFileSync('subbots.json', JSON.stringify(global.subbots, null, 2));
};

const loadSubbots = () => {
  if (fs.existsSync('subbots.json')) {
    global.subbots = JSON.parse(fs.readFileSync('subbots.json'));
  } else {
    global.subbots = {};
  }
};

loadSubbots();

global.saveSubbots = saveSubbots;
