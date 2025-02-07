import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

let who = m.messageStubParameters[0] + '@s.whatsapp.net'
let user = global.db.data.users[who]
//let pushname = user ? user.name : await conn.getName(who)
let pushname = m.pushName || 'Sin nombre'

//creador y otros
global.creador = 'Wa.me/5493876639332'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'https://wa.me/5493876639332'
global.namechannel = 'ᥴᥲᥒᥲᥣ ძᥱ іᥲᥒᥲᥣᥱȷᥲᥒძr᥆᥆k15᥊'
global.id = "120363268849510279@g.us"

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'

//Emojis determinado de ${botname} 
global.emoji = '✅'
global.emoji2 = '✅'
global.emoji3 = '✅'
global.emoji4 = '✅'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

//mensaje en espera
global.wait = 'Espere un momento...'
global.waitt = 'Espere un momento...'
global.waittt = 'Espere un momento...'
global.waitttt = 'Espere un momento...'

//Enlaces
var mensaje = '👋🏻 Hola bienvenido al grupo'  
var mensaje2 = '👋🏻 Seas bievenido al grupo'
var mensaje3 = '👋🏻 Nuevo integrante bienvenido'

var grupo = 'https://chat.whatsapp.com/GSXgETuAcJzCTrczXuPzmw'

global.welc = [mensaje, mensaje2, mensaje3].getRandom()

global.link = [grupo].getRandom()

//Imagen
let category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 1: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 3: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 4: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 5: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 6: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 7: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; break; case 8: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 9: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 10: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 11: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 12: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 13: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 14: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 15: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 16: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 18: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 19: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 20: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 21: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 22: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 23: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;}
global.saludo = hour;

//tags
global.nombre = conn.getName(m.sender)
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

//Fakes
global.fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': null, thumbnail: null,sendEphemeral: true}}}

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363318758721861@newsletter', newsletterName: namechannel, serverMessageId: -1 }
}}, { quoted: m }

global.icono = [ 
'https://ibb.co/Zz3G9bZ'
].getRandom()

global.e = [ 
'🌴',
'🍃',
'🍁',
'🍂',
'🌸',
'☘️',
'🍄',
'🌵',
'🍀',
'🌲',
'🌳',
'🍹',
'🥥',
'🌊'
].getRamdon()

global.me = [
'Este es el menu del bot no realices spam o de lo contrario seran sancionado',
'Menu completo del bot aqui tienes todas sus funciones',
'Recuerda que puedes hablar con el creador utilizando este comando \`/creador`\',
'Si tienes alguna duda o problema con el bot pon el comando \`/creador`\',
'Pronto se añadiran mas comandos espere pacientemente',
'Sabías que \`ianalejandrook15x`\ empezo por \`ianBot-MD`\',
'Cada problema tiene su solución ¿Y para la muerte?',
'Aprovecha tu vida al maximo ya que solo hay una',
'Este bot todavía sigue en desarrollo cada vez es un avance',
'El diseño es algo basico pero lo suficiente para mostrarlo',
].getRamdon()

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363318758721861@newsletter", serverMessageId: 100, newsletterName: namechannel, }, externalAdReply: { showAdAttribution: true, title: botname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: welc, mediaType: 1, renderLargerThumbnail: false }, }, }}

export default handler
