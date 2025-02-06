import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let chat = global.db.data.chats[m.chat]

 if (chat.welcome && m.messageStubType == 27) {
    let welcome = `*User ✦ @${m.messageStubParameters[0].split`@`[0]}*\n\n${global.welcome}`
await conn.sendMini(m.chat, redes, dev, welcome, image, image, redeshost)
  }
}
