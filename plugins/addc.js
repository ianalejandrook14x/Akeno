import fs from 'fs';

function loadData() {
  try {
    const data = fs.readFileSync('./personajes.json');
    return JSON.parse(data);
  } catch (error) {
    return {}; 
  }
}

function saveData(data) {
  fs.writeFileSync('./personajes.json', JSON.stringify(data, null, 2));
}

const handler = async (m, { command, args }) => {
  const animes = loadData();
  const animeId = args[0];
  const newCharacters = args.slice(1).join(" ").split("\n");

  if (!animeId || !animes[animeId]) {
    return m.reply('*No se encontro el anime*');
  }

  const anime = animes[animeId];

  newCharacters.forEach((character) => {
    const [tag, name] = character.split(" = ");
    if (tag && name) {
      anime.characters.push({ tag: tag.trim(), name: name.trim(), value: 50, price: 1000 });
    }
  });

  saveData(animes);

  m.reply(`*Se agrego personajes al anime: ${anime.name}*`);
};

handler.help = ['addc'];
handler.command = ['addc'];
handler.mods = true

export default handler;
