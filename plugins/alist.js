import fs from 'fs';

function loadData() {
  try {
    const data = fs.readFileSync('./personajes.json');
    return JSON.parse(data);
  } catch (error) {
    return {}; 
  }
}

const handler = async (m, { command }) => {
  const animes = loadData();
  
  if (Object.keys(animes).length === 0) {
    return m.reply("No se han agregado animes aún.");
  }
  
  let animeList = "*Lista de animes:*\n\n";
  for (let id in animes) {
    animeList += `> *${animes[id].name}*\n`;
  }

  return m.reply(animeList);
};

handler.help = ['alist'];
handler.command = ['alist'];
handler.mods = true

export default handler;
