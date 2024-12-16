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
  const animes = loadData();
  
  const animeId = args[0]; 
  const tag = args[1];
  const name = args.slice(2).join(" "); 
  
  if (!animes[animeId]) {
    return m.reply("Anime no encontrado.");
  }

  const character = {
    tag,
    name,
    anime: animes[animeId].name,
    value: 50,  
    price: 1000,
  };


  animes[animeId].characters.push(character);

  saveData(animes);
  
  return m.reply(`> Personaje agregado al anime ${animes[animeId].name}\n*${name}*\n`);
};

handler.help = ['addc'];
handler.command = ['addc'];

export default handler;
