import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => welcome)
    let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => imagen1)
  let img = await (await fetch(`${pp}`)).buffer()
  let img2 = await (await fetch(`${pp2}`)).buffer()

  let chat = global.db.data.chats[m.chat]

 if (chat.welcome && m.messageStubType == 27) {
    let welcome = ` ✦ ≺ ${botname} \n「 Bienvenido 」\n「 @${m.messageStubParameters[0].split`@`[0]} 」\n「 Bienvenido/a 」\n「 ${groupMetadata.subject} 」\n\n`
await conn.sendNino(m.chat, welcome, img, img, redes, fkontak)
  }}
