import fs from 'fs';
const obtenerDatos = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json', 'utf-8'))
    } else {
        return { usuarios: {}, personajesReservados: [] }
    }
};
const guardarDatos = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
};
const tagUser = (id) => '@' + id.split('@')[0]

let handler = async (m, { conn }) => {
    let data = obtenerDatos()  
    let mentionedJid = m.mentionedJid && m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted && m.quoted.sender 
            ? m.quoted.sender 
            : null
    if (!mentionedJid) {
        conn.reply(m.chat, '✦ Etiqueta algun usuario.', m, rcanal)
        return
    }

    if (!data.usuarios[mentionedJid]) {
        return
        }

    data.usuarios[mentionedJid].characters = [];
    data.usuarios[mentionedJid].characterCount = 0;
    data.usuarios[mentionedJid].totalRwcoins = 0;
    guardarDatos(data)

    conn.reply(m.chat, `*✦ Se han eliminado datos del usuario ${tagUser(mentionedJid)}*`, m, rcanal)};

handler.help = ['resetpersonajes']
handler.tags = ['owner']
handler.command = ['resetpersonajes', 'resetp', 'eliminarpersonajes', 'eliminarp']
handler.group = true
handler.mods = true
export default handler
