//editado por dylux

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
const {
  child,
  spawn,
  exec
} = await import("child_process");
const {
  CONNECTING
} = ws;
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
let rtx2 =  "✦ 𝗦𝗘𝗥 𝗦𝗨𝗕 𝗕𝗢𝗧 ✦\n\n*❀ Usa este Código para convertirte en un Sub Bot*\n\n`1` » Haga clic en los tres puntos en la esquina superior derecha\n\n`2` » Toca dispositivos vinculados\n\n`3` » Selecciona Vincular con el número de teléfono\n\n`4` » Escriba el Código\n\n❀ *Este código solo funciona en en el número que lo solicitó*\n\n*❒ Jadibot, Editado por @Dylux Hecho por @Aiden_NotLogic ✦*";
if (global.conns instanceof Array) {
  console.log();
} else {
  global.conns = [];
}
let handler = async (msg, {
  conn,
  args,
  usedPrefix,
  command,
  isOwner
}) => {
  if (!global.db.data.settings[conn.user.jid].jadibotmd) {
    return conn.reply(msg.chat, "🚩 Este Comando está deshabilitado por mi creador.", msg, rcanal);
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
    fs.mkdirSync("./" + jadi + "/" + userName, {
      recursive: true
    });
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
        fs.mkdirSync("./" + jadi + "/" + userName, {
          recursive: true
        });
      }

      if (args[0]) {
        fs.writeFileSync("./" + jadi + "/" + userName + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
      } else {
        "";
      }

      let {
        version,
        isLatest
      } = await fetchLatestBaileysVersion();
      const msgRetry = msgRetry => {};
      const cache = new nodeCache();
      const {
        state,
        saveState,
        saveCreds
      } = await useMultiFileAuthState("./" + jadi + "/" + userName);

      const config = {
        printQRInTerminal: false,
        logger: pino({
          level: "silent"
        }),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({
            level: "silent"
          }))
        },
        msgRetry: msgRetry,
        msgRetryCache: cache,
        version: [2, 3000, 1015901307],
        syncFullHistory: true,
        browser: isCode ? ["Ubuntu", "Chrome", "110.0.5585.95"] : ["${botname}Bot-MD (Sub Bot)", "Chrome", "2.0.0"],
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
        const {
          connection,
          lastDisconnect,
          isNewLogin,
          qr
        } = update;
        if (isNewLogin) {
          subBot.isInit = false;
        }
        if (qr && !isCode) {
          qrMessage = await user.sendMessage(msg.chat, {
            image: await qrcode.toBuffer(qr, {
              scale: 8
            }),
            caption: rtx + "\n" + secret.toString("utf-8")
          }, {
            quoted: msg
          });
          return;
        }
        if (qr && isCode) {
          code = await user.sendMessage(msg.chat, {
            text: rtx2 + "\n" + secret.toString("utf-8")
          }, {
            quoted: msg
          });
          await sleep(3000);
          pairingCode = await subBot.requestPairingCode(msg.sender.split`@`[0]);
          pairingCode = await msg.reply(pairingCode);
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
            return await msg.reply("🚩 Reenvia nuevamente el comando.");
          }
          if (disconnectCode === DisconnectReason.restartRequired) {
            initSubBot();
            return console.log("\n⌛ Tiempo de conexión agotado, reconectando...");
          } else if (disconnectCode === DisconnectReason.loggedOut) {
            sleep(4000);
            return msg.reply("🌻 *Tu dispositivo se ha deconectado*\n\nTendras que volver a conectarte usando:\n.deletesesion (Para borrar datos y poder volver a solita el QR o el code)");
          } else if (disconnectCode == 428) {
            await closeConnection(false);
            return msg.reply("🚩 La conexión se ha cerrado de manera inesperada, intentaremos reconectar...");
          } else if (disconnectCode === DisconnectReason.connectionLost) {
            await initSubBot();
            return console.log("\n⚠️ Conexión perdida con el servidor, reconectando....");
          } else if (disconnectCode === DisconnectReason.badSession) {
            return await msg.reply("🌻 La conexión se ha cerrado, deberá de conectarse manualmente usando el comando *.serbot* y reescanear el nuevo *QR.* Que fué enviada la primera vez que se hizo *SubBot*");
          } else if (disconnectCode === DisconnectReason.timedOut) {
            await closeConnection(false);
            return console.log("\n⌛ Tiempo de conexión agotado, reconectando....");
          } else {
            console.log("\n⚠️❗ Razón de la desconexión desconocida: " + (disconnectCode || "") + " >> " + (connection || ""));
          }
        }

        if (global.db.data == null) {
          loadDatabase();
        }

        if (connection == "open") {
          subBot.isInit = true;
          global.conns.push(subBot);
          await user.sendMessage(msg.chat, {
            text: args[0] ? "⚪ *Está conectado(a)!! Por favor espere se está cargando los mensajes...*\n\n♻️ *Opciones Disponibles:*\n*» " + usedPrefix + "pausarai _(Detener la función Sub Bot)_*\n*» " + usedPrefix + "deletesession _(Borrar todo rastro de Sub Bot)_*\n*» " + usedPrefix + "serbot _(Nuevo código QR o Conectarse si ya es Sub Bot)_*" : "✅ Conexión con éxito al WhatsApp si se desconecta envie *.code* link del canal: https://whatsapp.com/channel/0029VajkZ6bIXnlwPZmbuH1u"
          }, {
            quoted: msg
          });
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
          subBot = makeWASocket(config, {
            chats: chats
          });
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
