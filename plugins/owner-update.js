import { execSync } from 'child_process'

var handler = async (m, { conn, text }) => {

m.react('✅') 
try {

const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
let messager = stdout.toString()

if (messager.includes('El bot se encuentra actualizado.')) messager = 'El bot esta actualizado a la última versión.'

if (messager.includes('Actualizando.')) messager = 'Procesando.\n\n' + stdout.toString()
conn.reply(m.chat, messager, m, rcanal,)

} catch { 
try {

const status = execSync('git status --porcelain')

if (status.length > 0) {
const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('MiniSession/') || line.includes('npm-debug.log')) {
return null
}
return '*→ ' + line.slice(3) + '*'}).filter(Boolean)
if (conflictedFiles.length > 0) {
const errorMessage = `✦ Se hicieron cambios recientemente en el repositorio, reinstala el bot.\n\n✦ *ARCHIVOS EN CONFLICTO*\n\n${conflictedFiles.join('\n')}`
await conn.reply(m.chat, errorMessage, m, rcanal,)
}
}
} catch (error) {
console.error(error)
let errorMessage2 = '✦ Ocurrió un error inesperado.'
if (error.message) {
errorMessage2 += '\n✦ Mensaje de error: ' + error.message;
}
await conn.reply(m.chat, errorMessage2, m, rcanal,)
}
}

}

handler.help = ['update', 'actualizar']
handler.tags = ['owner']
handler.command = ['update', 'actualizar']
handler.rowner = true

export default handler
