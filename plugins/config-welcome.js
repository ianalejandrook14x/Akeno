import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => welcome)
    let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => adios)
  let img = await (await fetch(`${pp}`)).buffer()
  let img2 = await (await fetch(`${pp2}`)).buffer()
  let chat = global.db.data.chats[m.chat]

 if (chat.welcome && m.messageStubType == 27) {
    let welcome = `*Hola ✦*\n\n${global.welcome}`
await conn.sendMini(m.chat, redes, dev, welcome, catalogo, catalogo, redeshost, estilo)
  }
}
