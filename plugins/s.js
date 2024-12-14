// agrega lo siguiente en el package.json 
// 

import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import canvafy from 'canvafy';

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => welcome)
    let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => adios)
  let img = await (await fetch(`${pp}`)).buffer()
  let img2 = await (await fetch(`${pp2}`)).buffer()

  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
          const imagewel = await new canvafy.WelcomeLeave()
          .setAvatar(img) 
          .setBackground("image", "https://qu.ax/zQYxM.jpg")
          .setTitle('Bienvenido')
          .setDescription(`Hola, bienvenido al grupo`)
          .setBorder("#000000")
          .setAvatarBorder("#F0F8FF")
          .setOverlayOpacity(0.3)
          .setBackgroundColor("#D3D3D3")
          .build();
    let welcome = `*Hola ✦*\n\n${global.welcome}`
  await conn.sendMessage(m.chat, { image: imagewel, caption: welcome }, { quoted: fkontak })
// await conn.sendMini(m.chat, redes, dev, welcome, img, img, redeshost)
}}
