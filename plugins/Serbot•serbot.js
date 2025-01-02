// Editado por dylux
const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import("@whiskeysockets/baileys");
import qrcode from "qrcode";
import nodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from "pino";
import util from "util";
import * as ws from "ws";
const { child, spawn, exec } = await import("child_process");
const { CONNECTING } = ws;
import { makeWASocket } from "../lib/simple.js";
let check1 = "60adedfeb87c6";
let check2 = "e8d2cd8ee01fd";
let check3 = "S6A2514  in";
let check4 = "m-Donar.js";
let check5 = "76c3ff3561123379739e9faf06cc538";
let check6 = "7  _autoresponder.js59c74f1c6a3";
let check8 = "63fbbcc05babcc3de80de  info-bot.js";
let crm1 = "cd plugins";
let crm2 = "; md5sum";
let crm3 = "Sinfo-Donar.js";
let crm4 = " _autoresponder.js info-bot.js";
let drm1 = "";
let drm2 = "";
let rtx = "✦ 𝗦𝗘𝗥 𝗦𝗨𝗕 𝗕𝗢𝗧 ✦\n\n*❀ Utilice otro celular para escanear este codigo QR o escanea el codigo mediante una PC para convertirte en Sub Bot*\n\n`1` » Haga clic en los tres puntos en la esquina superior derecha\n\n`2` » Toca dispositivos vinculados\n\n`3` » Escanee este codigo QR para iniciar sesión\n\n❀ *Este código QR expira en 45 segundos*\n\n*❒ Editado por @Dylux Jadibot, Hecho por @Aiden_NotLogic ✦*";
let rtx2 = "✦ 𝗦𝗘𝗥 𝗦𝗨𝗕 𝗕𝗢𝗧 ✦\n\n*❀ Usa este Código para convertirte en un Sub Bot*\n\n`1` » Haga clic en los tres puntos en la esquina superior derecha\n\n`2` » Toca dispositivos vinculados\n\n`3` » Selecciona Vincular con el número de teléfono\n\n`4` » Escriba el Código\n\n❀ *Este código solo funciona en en el número que lo solicitó*\n\n*❒ Jadibot, Editado por @Dylux Hecho por @Aiden_NotLogic ✦*";

// Inicialización de conexiones globales
if (global.conns instanceof Array) {
  console.log();
} else {
  global.conns = [];
}

// Límite de subbots
const MAX_SUBBOTS = 50;

// Función para cargar todos los subbots al iniciar el servidor
async function loadSubbots() {
  const serbotFolders = fs.readdirSync('./' + jadi);
  for (const folder of serbotFolders) {
    if (global.conns.length >= MAX_SUBBOTS) {
      console.log(`*Límite de ${MAX_SUBBOTS} subbots alcanzado.*`);
      break;
    }
    const folderPath = `./${jadi}/${folder}`;
    if (fs.statSync(folderPath).isDirectory()) {
      const { state, saveCreds } = await useMultiFileAuthState(folderPath);
      const { version } = await fetchLatestBaileysVersion();

      const connectionOptions = {
        version,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: false,
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: [`Dylux`, "IOS", "4.1.0"],
      };

      let conn = makeWASocket(connectionOptions);
      conn.isInit = false;
      let isInit = true;

      let reconnectionAttempts = 0; // Contador de intentos de reconexión

      async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin } = update;
        if (isNewLogin) {
          conn.isInit = true;
        }
        const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
          let i = global.conns.indexOf(conn);
          if (i < 0) return;
          delete global.conns[i];
          global.conns.splice(i, 1);
        }
        if (connection == "open") {
          conn.isInit = true;
          global.conns.push(conn);
          console.log(`Subbot ${folder} conectado exitosamente.`);
        }

        if (connection === 'close' || connection === 'error') {
          reconnectionAttempts++;
          let waitTime = 1000;

          if (reconnectionAttempts > 4) waitTime = 10000;
          else if (reconnectionAttempts > 3) waitTime = 5000;
          else if (reconnectionAttempts > 2) waitTime = 3000;
          else if (reconnectionAttempts > 1) waitTime = 2000;

          setTimeout(async () => {
            try {
              conn.ws.close();
              conn.ev.removeAllListeners();
              conn = makeWASocket(connectionOptions);
              conn.handler = handler.handler.bind(conn);
              conn.connectionUpdate = connectionUpdate.bind(conn);
              conn.credsUpdate = saveCreds.bind(conn, true);
              conn.ev.on('messages.upsert', conn.handler);
              conn.ev.on('connection.update', conn.connectionUpdate);
              conn.ev.on('creds.update', conn.credsUpdate);
              await creloadHandler(false);
            } catch (error) {
              console.error('Error durante la reconexión:', error);
            }
          }, waitTime);
        }

        // Eliminar carpeta si el usuario cierra la sesión manualmente
        if (code === DisconnectReason.loggedOut) {
          fs.rmdirSync(folderPath, { recursive: true });
          console.log(`🗑️ Carpeta de credenciales eliminada para el subbot ${folder}.`);
        }
      }

      let handler = await import("../handler.js");

      let creloadHandler = async function (restatConn) {
        try {
          const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
          if (Object.keys(Handler || {}).length) handler = Handler;
        } catch (e) {
          console.error(e);
        }
        if (restatConn) {
          try {
            conn.ws.close();
          } catch {}
          conn.ev.removeAllListeners();
          conn = makeWASocket(connectionOptions);
          isInit = true;
        }
        if (!isInit) {
          conn.ev.off("messages.upsert", conn.handler);
          conn.ev.off("connection.update", conn.connectionUpdate);
          conn.ev.off('creds.update', conn.credsUpdate);
        }
        conn.handler = handler.handler.bind(conn);
        conn.connectionUpdate = connectionUpdate.bind(conn);
        conn.credsUpdate = saveCreds.bind(conn, true);
        conn.ev.on("messages.upsert", conn.handler);
        conn.ev.on("connection.update", conn.connectionUpdate);
        conn.ev.on("creds.update", conn.credsUpdate);
        isInit = false;
        return true;
      }
      creloadHandler(false);
    }
  }
}

// Cargar subbots al iniciar el servidor
loadSubbots().catch(console.error);

// Handler principal
let handler = async (msg, { conn, args, usedPrefix, command, isOwner }) => {
  if (!global.db.data.settings[conn.user.jid].jadibotmd) {
    return conn.reply(msg.chat, "*❀ Este Comando está deshabilitado por mi creador.*", msg, rcanal);
  }

  // Verificar límite de subbots
  if (global.conns.length >= MAX_SUBBOTS) {
    return conn.reply(msg.chat, `*❀ Lo siento, se ha alcanzado el límite de ${MAX_SUBBOTS} subbots. Por favor, intenta más tarde.*`, msg, rcanal);
  }

  let user = conn;
  const isCode = command === "code" || (args[0] && /(--code|code)/.test(args[0].trim()));
  let code;
  let pairingCode;
  let qrMessage;
  let userData = global.db.data.users[msg.sender];
  let userJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? user.user.jid : msg.sender;
  let userName = "" + userJid.split`@`[0];

  if (isCode) {
    args[0] = args[0]?.replace(/^--code$|^code$/, "").trim() || undefined;
    if (args[1]) {
      args[1] = args[1].replace(/^--code$|^code$/, "").trim();
    }
  }

  if (!fs.existsSync("./" + jadi + "/" + userName)) {
    fs.mkdirSync("./" + jadi + "/" + userName, { recursive: true });
  }

  if (args[0] && args[0] != undefined) {
    fs.writeFileSync("./" + jadi + "/" + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
  } else {
    "";
  }

  if (fs.existsSync("./" + jadi + "/" + userName + "/creds.json")) {
    let creds = JSON.parse(fs.readFileSync("./" + jadi + "/" + userName + "/creds.json"));
    if (creds) {
      if (creds.registered === false) {
        fs.unlinkSync("./" + jadi + "/" + userName + "/creds.json");
      }
    }
  }

  const execCommand = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
  exec(execCommand.toString("utf-8"), async (error, stdout, stderr) => {
    const secret = Buffer.from(drm1 + drm2, "base64");

    async function initSubBot() {
      let userJid = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? user.user.jid : msg.sender;
      let userName = "" + userJid.split`@`[0];

      if (!fs.existsSync("./" + jadi + "/" + userName)) {
        fs.mkdirSync("./" + jadi + "/" + userName, { recursive: true });
      }

      if (args[0]) {
        fs.writeFileSync("./" + jadi + "/" + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
      } else {
        "";
      }

      let { version, isLatest } = await fetchLatestBaileysVersion();
      const msgRetry = msgRetry => {};
      const cache = new nodeCache();
      const { state, saveState, saveCreds } = await useMultiFileAuthState("./" + jadi + "/" + userName);

      const config = {
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        },
        msgRetry: msgRetry,
        msgRetryCache: cache,
        version: [2, 3000, 1015901307],
        syncFullHistory: true,
        browser: isCode ? ["Ubuntu", "Chrome", "110.0.5585.95"] : ["${botname} (Sub Bot)", "Chrome", "2.0.0"],
        defaultQueryTimeoutMs: undefined,
        getMessage: async msgId => {
          if (store) {}
          return {
            conversation: "${botname}Bot-MD"
          };
        }
      };

      let subBot = makeWASocket(config);
      subBot.isInit = false;
      let isConnected = true;

      async function handleConnectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update;
        if (isNewLogin) {
          subBot.isInit = false;
        }
        if (qr && !isCode) {
          qrMessage = await user.sendMessage(msg.chat, {
            image: await qrcode.toBuffer(qr, { scale: 8 }),
            caption: rtx + "\n" + secret.toString("utf-8"),
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363318758721861@newsletter', // Reemplaza con el JID de tu canal
                newsletterName: '✦ Akeno channel', // Reemplaza con el nombre de tu canal
                serverMessageId: -1
              }
            }
          }, { quoted: msg });

          // Borrar el mensaje después de 30 segundos
          setTimeout(async () => {
            await user.sendMessage(msg.chat, { delete: qrMessage.key });
          }, 30000); // 30 segundos
          return;
        }
        if (qr && isCode) {
          // Enviar el mensaje con las instrucciones y el diseño del canal
          code = await user.sendMessage(msg.chat, {
            text: rtx2 + "\n" + secret.toString("utf-8"),
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363318758721861@newsletter', // Reemplaza con el JID de tu canal
                newsletterName: '✦ Akeno channel', // Reemplaza con el nombre de tu canal
                serverMessageId: -1
              }
            }
          }, { quoted: msg });

          // Obtener el código de 8 dígitos
          await sleep(3000);
          pairingCode = await subBot.requestPairingCode(msg.sender.split`@`[0]);

          // Enviar el código de 8 dígitos con el diseño del canal
          pairingCodeMessage = await user.sendMessage(msg.chat, {
            text: pairingCode, // Solo el código de 8 dígitos
            contextInfo: {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363318758721861@newsletter', // Reemplaza con el JID de tu canal
                newsletterName: '✦ Akeno channel', // Reemplaza con el nombre de tu canal
                serverMessageId: -1
              }
            }
          }, { quoted: msg });

          // Borrar el mensaje de instrucciones después de 30 segundos
          setTimeout(async () => {
            await user.sendMessage(msg.chat, { delete: code.key });
          }, 30000); // 30 segundos

          // Borrar el mensaje del código de 8 dígitos después de 30 segundos
          setTimeout(async () => {
            await user.sendMessage(msg.chat, { delete: pairingCodeMessage.key });
          }, 30000); // 30 segundos
        }

        const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        console.log(statusCode);

        const closeConnection = async shouldClose => {
          if (!shouldClose) {
            try {
              subBot.ws.close();
            } catch {}
            subBot.ev.removeAllListeners();
            let index = global.conns.indexOf(subBot);
            if (index < 0) {
              return;
            }
            delete global.conns[index];
            global.conns.splice(index, 1);
          }
        };

        const disconnectCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (connection === "close") {
          console.log(disconnectCode);
          if (disconnectCode == 405) {
            await fs.unlinkSync("./" + jadi + "/" + userName + "/creds.json");
            return await msg.reply("❀ Reenvia nuevamente el comando.");
          }
          if (disconnectCode === DisconnectReason.restartRequired) {
            initSubBot();
            return console.log("\n❀ Tiempo de conexión agotado, reconectando...");
          } else if (disconnectCode === DisconnectReason.loggedOut) {
            fs.rmdirSync(`./${jadi}/${userName}`, { recursive: true });
            return msg.reply("❀ *Tu dispositivo se ha deconectado*\n\nTendras que volver a conectarte usando:\n.deletesesion (Para borrar datos y poder volver a solita el QR o el code)");
          } else if (disconnectCode == 428) {
            await closeConnection(false);
            return msg.reply("❀ La conexión se ha cerrado de manera inesperada, intentaremos reconectar...");
          } else if (disconnectCode === DisconnectReason.connectionLost) {
            await initSubBot();
            return console.log("\n❀Conexión perdida con el servidor, reconectando....");
          } else if (disconnectCode === DisconnectReason.badSession) {
            return await msg.reply("❀ La conexión se ha cerrado, deberá de conectarse manualmente usando el comando *.serbot* y reescanear el nuevo *QR.* Que fué enviada la primera vez que se hizo *SubBot*");
          } else if (disconnectCode === DisconnectReason.timedOut) {
            await closeConnection(false);
            return console.log("\n❀ Tiempo de conexión agotado, reconectando....");
          } else {
            console.log("\n❀ Razón de la desconexión desconocida: " + (disconnectCode || "") + " >> " + (connection || ""));
          }
        }

        if (global.db.data == null) {
          loadDatabase();
        }

        if (connection == "open") {
          subBot.isInit = true;
          global.conns.push(subBot);
          await user.sendMessage(msg.chat, {
            text: args[0] ? "❀ *Está conectado(a)!! Por favor espere se está cargando los mensajes...*\n\n❀ *Opciones Disponibles:*\n*» " + usedPrefix + "pausarai _(Detener la función Sub Bot)_*\n*» " + usedPrefix + "deletesession _(Borrar todo rastro de Sub Bot)_*\n*» " + usedPrefix + "serbot _(Nuevo código QR o Conectarse si ya es Sub Bot)_*" : "*❀ Conexión con éxito al WhatsApp*"
          }, { quoted: msg });
          if (!args[0]) {
            /* user.sendMessage(msg.chat, {
               text: usedPrefix + command + " " + Buffer.from(fs.readFileSync("./" + jadi + "/" + userName + "/creds.json"), "utf-8").toString("base64")
             }, { quoted: msg });*/
          }
        }
      }

      setInterval(async () => {
        if (!subBot.user) {
          try {
            subBot.ws.close();
          } catch (error) {
            console.log(await updateHandler(true).catch(console.error));
          }
          subBot.ev.removeAllListeners();
          let index = global.conns.indexOf(subBot);
          if (index < 0) {
            return;
          }
          delete global.conns[index];
          global.conns.splice(index, 1);
        }
      }, 60000);

      let handlerModule = await import("../handler.js");
      let updateHandler = async shouldReconnect => {
        try {
          const updatedModule = await import("../handler.js?update=" + Date.now()).catch(console.error);
          if (Object.keys(updatedModule || {}).length) {
            handlerModule = updatedModule;
          }
        } catch (error) {
          console.error(error);
        }
        if (shouldReconnect) {
          const chats = subBot.chats;
          try {
            subBot.ws.close();
          } catch {}
          subBot.ev.removeAllListeners();
          subBot = makeWASocket(config, { chats: chats });
          isConnected = true;
        }
        if (!isConnected) {
          subBot.ev.off("messages.upsert", subBot.handler);
          subBot.ev.off("connection.update", subBot.connectionUpdate);
          subBot.ev.off("creds.update", subBot.credsUpdate);
        }
        const currentTime = new Date();
        const lastEventTime = new Date(subBot.ev * 1000);
        if (currentTime.getTime() - lastEventTime.getTime() <= 300000) {
          console.log("Leyendo mensaje entrante:", subBot.ev);
          Object.keys(subBot.chats).forEach(chatId => {
            subBot.chats[chatId].isBanned = false;
          });
        } else {
          console.log(subBot.chats, "🚩 Omitiendo mensajes en espera.", subBot.ev);
          Object.keys(subBot.chats).forEach(chatId => {
            subBot.chats[chatId].isBanned = true;
          });
        }
        subBot.handler = handlerModule.handler.bind(subBot);
        subBot.connectionUpdate = handleConnectionUpdate.bind(subBot);
        subBot.credsUpdate = saveCreds.bind(subBot, true);
        subBot.ev.on("messages.upsert", subBot.handler);
        subBot.ev.on("connection.update", subBot.connectionUpdate);
        subBot.ev.on("creds.update", subBot.credsUpdate);
        isConnected = false;
        return true;
      };

      updateHandler(false);
    }

    initSubBot();
  });
};

handler.help = ["serbot", "serbot --code", "code"];
handler.tags = ["serbot"];
handler.command = ["jadibot", "serbot", "code"];

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
