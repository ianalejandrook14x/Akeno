import fs from 'fs';

function loadData() {
  try {
    const data = fs.readFileSync('./personajes.json');
    return JSON.parse(data);
  } catch (error) {
    return {}; 
  }
}

function saveData(animes) {
  fs.writeFileSync('./personajes.json', JSON.stringify(animes, null, 2));
}

const handler = async (m, { command, args }) => {
  const animeName = args.join(" "); 
  const animeId = generateAnimeId(); 
  
  const animes = loadData();

  if (animes[animeId]) {
    return m.reply("Este anime ya existe.");
  }

  animes[animeId] = {
    name: animeName,
    characters: [],
  };

  saveData(animes);
  
  return m.reply(`*${animeName} | ID: ${animeId}*`);
};

function generateAnimeId() {
  return Math.random().toString(36).substring(2, 10);
}

handler.help = ['adda'];
handler.command = ['adda'];
handler.mods = true

export default handler;
