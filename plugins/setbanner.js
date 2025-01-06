import fs from 'fs';  
import path from 'path';  
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn, isRowner }) => {
  if (!m.quoted || !/image|video/.test(m.quoted.mimetype)) return m.reply('✦ *Responda a una imagen con el comando para cambiar el banner*.');

  try {
    const media = await m.quoted.download();
    let link = await catbox(media);

    if (!isImageValid(media)) {
      return m.reply('✧ El archivo enviado no es una imagen válida.');
    }

    const userId = m.sender;
    if (!global.subbots) global.subbots = {};

    if (!global.subbots[userId]) {
      return m.reply('*Este comando solo puede ser usado por el dueño del PreBot*');
    }

    global.subbots[userId].banner = `${link}`;
    m.reply('*✦ El banner de tu subbot fue actualizado*');
  } catch (error) {
    console.error(error);
    m.reply('*✧ Hubo un error al intentar cambiar el banner.*');
  }
};

const isImageValid = (buffer) => {
  const magicBytes = buffer.slice(0, 4).toString('hex');
  if (magicBytes === 'ffd8ffe0' || magicBytes === 'ffd8ffe1' || magicBytes === 'ffd8ffe2' || magicBytes === '89504e47' || magicBytes === '47494638') {
    return true;
  }
  return false; 
};

handler.help = ['setbanner'];
handler.tags = ['customization'];
handler.command = ['setbanner'];
handler.mods = true;

export default handler;

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, randomBytes + "." + ext);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    },
  });

  return await response.text();
}
