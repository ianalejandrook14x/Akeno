import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/audio|video/.test(mime)) {
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
let { code, msg } = res.status
if (code !== 0) throw msg
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `
Resultado de la busqueda

✦ Titulo: ${title}
✦ Artista: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'No encontrado'}
✦ Album: ${album.name || 'No encontrado'}
✦ Genero: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'No encontrado'}
✦ Lanzamiento: ${release_date || 'No encontrado'}
`.trim()
fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
m.reply(txt)
} else throw 'Responda A Un Audio O Video'
}
handler.command = ['quemusica', 'quemusicaes', 'whatmusic']
export default handler
