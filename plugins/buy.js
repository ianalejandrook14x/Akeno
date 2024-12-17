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

const handler = async (m, { command, args, sender, quotedMsg }) => {
  if (!quotedMsg || !quotedMsg.image) {
    return m.reply('*Responde .');
  }

  const { tag, anime } = quotedMsg;
  
  const animes = loadData();

  if (!animes[anime]) {
    return m.reply('*Anime no encontrado*.');
  }

  const animeData = animes[anime];

  const personaje = animeData.characters.find(c => c.tag === tag);

  if (!personaje) {
    return m.reply('Personaje no encontrado en este anime.');
  }

  const now = Date.now();
  const tiempoProteccion = 10 * 1000; // 10 segundos
  const tiempoExpiracion = 120 * 1000; // 2 minutos

  if (personaje.estado !== 'libre') {
    if (now < personaje.lastClaimed + tiempoProteccion) {
      const secondsRemaining = Math.ceil((personaje.lastClaimed + tiempoProteccion - now) / 1000);
      return m.reply(`Este personaje está protegido por ${personaje.estado} durante ${secondsRemaining} segundos.`);
    }
    if (now > personaje.lastClaimed + tiempoExpiracion) {
      return m.reply(`*El personaje ${personaje.name} ha expirado*`);
    }
  }

  personaje.estado = sender; 
  personaje.lastClaimed = now;

  saveData(animes);

  const imageUrl = getCharacterImageUrl(personaje.tag); 

  m.reply(`*Has reclamado al personaje ${personaje.name}'`, {
    image: { url: imageUrl },
    caption: `Personaje: ${personaje.name}\nAnime: ${animeData.name}\nValor: $${personaje.value}\nPrecio: $${personaje.price}`
  });
};

handler.help = ['buy'];
handler.command = ['buy'];
handler.mods = true

export default handler;
