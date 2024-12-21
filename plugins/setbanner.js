import fs from 'fs';  
import path from 'path';  
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn, isRowner }) => {
  if (!m.quoted || !m.quoted.mimetype) {
    return m.reply('✦ *Responda a una imagen, video o GIF con el comando para cambiar el banner*.');
  }

  try {
    const media = await m.quoted.download();
    const { mime } = await fileTypeFromBuffer(media) || {};

    if (!isMediaValid(mime)) {
      return m.reply('✧ *El archivo enviado no es un formato válido. Solo se permiten imágenes, videos y GIFs*');
    }

    const link = await catbox(media);
    global.banner = `${link}`;
    m.reply(`*✦ El banner fue actualizado*`);
  } catch (error) {
    console.error(error);
    m.reply('*✧ Hubo un error al intentar cambiar el banner.*');
  }
};

const isMediaValid = (mime) => {
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/webm"
  ];
  return validTypes.includes(mime);
};

handler.help = ['setbanner'];
handler.tags = ['banner'];
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
