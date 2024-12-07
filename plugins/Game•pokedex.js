import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '✦ *¿Que Pokémon quieres buscar?.*', m, )
await m.react(rwait)
const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
const response = await fetch(url);
const json = await response.json();
if (!response.ok) {
await m.react(error)
return conn.reply(m.chat, '✦ *Hubo un error al buscar el Pokémon. Por favor, inténtalo de nuevo más tarde.*', m, )}
const aipokedex = `✦ *Pokedex - Información de ${json.name}*\n\n✦ *Nombre:* ${json.name}\n✦ *ID:* ${json.id}\n✦ *Tipo:* ${json.type}\n✦ *Habilidades:* ${json.abilities}\n*Tamaño:* ${json.height}\n✦ *Peso:* ${json.weight}\n\n✦ *Descripción:*\n${json.description}\n\n✦ Encuentra más detalles sobre este Pokémon en la Pokedex ✦\n\n✦ https://www.pokemon.com/es/pokedex/${json.name.toLowerCase()}`
conn.reply(m.chat, aipokedex, m, )
await m.react(done) }

handler.help = ['pokedex *<pokemon>*']
handler.tags = ['fun']
handler.command = ['pokedex']
export default handler
