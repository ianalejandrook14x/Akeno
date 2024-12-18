import fs from 'fs';

function loadData() {
  try {
    const data = fs.readFileSync('./personajes.json');
    return JSON.parse(data);
  } catch (error) {
    return {}; 
  }
}

const handler = async (m, { command, args }) => {
  if (args.length === 0) {
    return m.reply("Proporciona el nombre del anime.");
  }

  const animeName = args.join(" "); // Nombre del anime
  const animes = loadData();

  const animeId = Object.keys(animes).find(id => animes[id].name.toLowerCase() === animeName.toLowerCase());

  if (!animeId) {
    return m.reply("Anime no encontrado.");
  }

  const anime = animes[animeId];

  if (anime.characters.length === 0) {
    return m.reply(`*No se encontraron personajes agregados en el anime: ${anime.name}*`);
  }

  let characterList = `*Personajes de ${anime.name}:*\n*ID: ${animeId}*\n\n`;
  anime.characters.forEach(character => {
    characterList += `> *${character.name}*\n`;
  });

  return m.reply(characterList);
};

handler.help = ['ainfo'];
handler.command = ['ainfo'];
handler.mods = true
export default handler;
