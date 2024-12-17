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

function pickRandom(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const handler = async (m, { conn, args, usedPrefix }) => {
  if (!args[0]) {
    return m.reply(`✧ Uso incorrecto. Usa el comando de la siguiente manera:\n${usedPrefix}vote <nombre_del_personaje>`);
  }

  const characterName = args.join(" ");
  
  const animes = loadData();

  let characterFound = false;

  for (const animeKey in animes) {
    for (let character of animes[animeKey].characters) {
      if (character.name.toLowerCase() === characterName.toLowerCase()) {
        
        const currentTime = Date.now();
        const timeDiff = currentTime - character.lastVoted; 

      
        if (timeDiff < 30 * 60 * 1000) {
         
          return m.reply(`✧ El personaje *${character.name}* está en recarga. Puede ser votado nuevamente en *30 minutos*.`);
        }

       
        const valor = pickRandom([66, 78, 88, 86, 83, 92, 95, 101, 107, 115]);
        character.value += valor;
        character.price = character.value * 20; 

      
        character.lastVoted = currentTime;

        saveData(animes);

        await m.reply(`✧ Votaste por *${character.name}*.\n*Nuevo valor*: ${character.value}\n*${currency}*: $${character.price}`);
        characterFound = true;
        break;
      }
    }
    if (characterFound) break; 
  }

  if (!characterFound) {
    return m.reply(`✧ No se encontró el personaje *${characterName}* en la base de datos.`);
  }
};

handler.help = ['vote <nombre_del_personaje>'];
handler.command = ['vote'];
handler.tags = ['anime'];
handler.mods = true

export default handler;
