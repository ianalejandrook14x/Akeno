const { fetchLatestBaileysVersion, useMultiFileAuthState, DisconnectReason } = await import('@whiskeysockets/baileys')
import qrcode from 'qrcode'
import fs from 'fs'
import pino from 'pino'
import { makeWASocket } from '../lib/simple.js'

if (global.conns instanceof Array) {
  console.log()
} else {
  global.conns = []
}

// Función para cargar todos los subbots al iniciar el servidor
async function loadSubbots() {
  const serbotFolders = fs.readdirSync('./' + jadi) 
  for (const folder of serbotFolders) {
    const folderPath = `./${jadi}/${folder}` 
    if (fs.statSync(folderPath).isDirectory()) {
      const { state, saveCreds } = await useMultiFileAuthState(folderPath)
      const { version } = await fetchLatestBaileysVersion()

      const connectionOptions = {
        version,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: false,
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: [`Dylux`, "IOS", "4.1.0"],
      }

      let conn = makeWASocket(connectionOptions)
      conn.isInit = false
      let isInit = true

      let reconnectionAttempts = 0 // Contador de intentos de reconexión

      async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin } = update
        if (isNewLogin) {
          conn.isInit = true
        }
        const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
        if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
          let i = global.conns.indexOf(conn)
          if (i < 0) return
          delete global.conns[i]
          global.conns.splice(i, 1)
        }
        if (connection == "open") {
          conn.isInit = true
          global.conns.push(conn)
          console.log(`Subbot ${folder} conectado exitosamente.`)
        }

        if (connection === 'close' || connection === 'error') {
          reconnectionAttempts++
          let waitTime = 1000 

          if (reconnectionAttempts > 4) waitTime = 10000 
          else if (reconnectionAttempts > 3) waitTime = 5000 
          else if (reconnectionAttempts > 2) waitTime = 3000 
          else if (reconnectionAttempts > 1) waitTime = 2000 

          setTimeout(async () => {
            try {
              conn.ws.close()
              conn.ev.removeAllListeners()
              conn = makeWASocket(connectionOptions)
              conn.handler = handler.handler.bind(conn)
              conn.connectionUpdate = connectionUpdate.bind(conn)
              conn.credsUpdate = saveCreds.bind(conn, true)
              conn.ev.on('messages.upsert', conn.handler)
              conn.ev.on('connection.update', conn.connectionUpdate)
              conn.ev.on('creds.update', conn.credsUpdate)
              await creloadHandler(false)
            } catch (error) {
              console.error('Error durante la reconexión:', error)
            }
          }, waitTime)
        }
      }

      let handler = await import("../handler.js")

      let creloadHandler = async function (restatConn) {
        try {
          const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
          if (Object.keys(Handler || {}).length) handler = Handler
        } catch (e) {
          console.error(e)
        }
        if (restatConn) {
          try {
            conn.ws.close()
          } catch {}
          conn.ev.removeAllListeners()
          conn = makeWASocket(connectionOptions)
          isInit = true
        }
        if (!isInit) {
          conn.ev.off("messages.upsert", conn.handler)
          conn.ev.off("connection.update", conn.connectionUpdate)
          conn.ev.off('creds.update', conn.credsUpdate)
        }
        conn.handler = handler.handler.bind(conn)
        conn.connectionUpdate = connectionUpdate.bind(conn)
        conn.credsUpdate = saveCreds.bind(conn, true)
        conn.ev.on("messages.upsert", conn.handler)
        conn.ev.on("connection.update", conn.connectionUpdate)
        conn.ev.on("creds.update", conn.credsUpdate)
        isInit = false
        return true
      }
      creloadHandler(false)
    }
  }
}

// Cargar subbots al iniciar el servidor
loadSubbots().catch(console.error)

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems}) => {

let parentw = args[0] && args[0] == "plz" ? conn : await global.conn

async function serbot() {
    let serbotFolder = m.sender.split('@')[0]
    let folderSub = `./${jadi}/${serbotFolder}` 
    if (!fs.existsSync(folderSub)) {
      fs.mkdirSync(folderSub, { recursive: true })
    }
    if (args[0]) {
      fs.writeFileSync(`${folderSub}/creds.json`, Buffer.from(args[0], 'base64').toString('utf-8'))
    }

    const { state, saveCreds } = await useMultiFileAuthState(folderSub);
    const { version } = await fetchLatestBaileysVersion()

    const connectionOptions = {
      version,
      keepAliveIntervalMs: 30000,
      printQRInTerminal: true,
      logger: pino({ level: "fatal" }),
      auth: state,
      browser: [`Dylux`, "IOS", "4.1.0"],
    };

    let conn = makeWASocket(connectionOptions)
    conn.isInit = false
    let isInit = true

    let reconnectionAttempts = 0; 

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update
      if (isNewLogin) {
        conn.isInit = true
      }
      if (qr) {
        let txt = 'Serbot hecho por @Dylux\n\n'
            txt += `> *Nota:* Este código QR expira en 30 segundos.`
        let sendQR = await parentw.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), "qrcode.png", txt, m, null)
        
       setTimeout(() => {
         parentw.sendMessage(m.chat, { delete: sendQR.key })
       }, 30000)
        
      }
      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
      if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        let i = global.conns.indexOf(conn)
        if (i < 0) {
          return console.log(await creloadHandler(true).catch(console.error))
        }
        delete global.conns[i]
        global.conns.splice(i, 1)
        if (code !== DisconnectReason.connectionClosed) {
          await parentw.reply(conn.user.jid, "Conexión perdida...", m, rcanal)
        }
      }
      if (global.db.data == null) {
        loadDatabase()
      }
      if (connection == "open") {
        conn.isInit = true
        global.conns.push(conn)
        await parentw.reply(m.chat, args[0] ? 'Conectado con exito' : 'Conectado exitosamente con WhatsApp\n\n La mamada de bot se reconecta automáticamente si te artas solo borra la sesión', m, rcanal)
        await sleep(5000)
        if (args[0]) {
          return
        }
        await parentw.reply(conn.user.jid, "La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin escanear otro código *QR*", m, rcanal)
        await parentw.reply(conn.user.jid, usedPrefix + command + " " + Buffer.from(fs.readFileSync(`${folderSub}/creds.json`), 'utf-8').toString('base64'), m, rcanal)
      } 

      if (connection === 'close' || connection === 'error') {
        reconnectionAttempts++;
        let waitTime = 1000; 

        if (reconnectionAttempts > 4) waitTime = 10000 
        else if (reconnectionAttempts > 3) waitTime = 5000 
        else if (reconnectionAttempts > 2) waitTime = 3000 
        else if (reconnectionAttempts > 1) waitTime = 2000 

        setTimeout(async () => {
          try {
            conn.ws.close()
            conn.ev.removeAllListeners()
            conn = makeWASocket(connectionOptions)
            conn.handler = handler.handler.bind(conn)
            conn.connectionUpdate = connectionUpdate.bind(conn)
            conn.credsUpdate = saveCreds.bind(conn, true)
            conn.ev.on('messages.upsert', conn.handler)
            conn.ev.on('connection.update', conn.connectionUpdate)
            conn.ev.on('creds.update', conn.credsUpdate)
            await creloadHandler(false)
          } catch (error) {
            console.error('Error durante la reconexión:', error)
          }
        }, waitTime)
      }
    }

    const timeoutId = setTimeout(() => {
        if (!conn.user) {
            try {
                conn.ws.close()
            } catch {}
            conn.ev.removeAllListeners()
            let i = global.conns.indexOf(conn)
            if (i >= 0) {
                delete global.conns[i]
                global.conns.splice(i, 1)
            }
            fs.rmdirSync(`./${jadi}/${serbotFolder}`, { recursive: true }) 
        }
    }, 30000)

    let handler = await import("../handler.js")

    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) handler = Handler
      } catch (e) {
        console.error(e)
      }
      if (restatConn) {
        try {
          conn.ws.close()
        } catch {}
        conn.ev.removeAllListeners()
        conn = makeWASocket(connectionOptions)
        isInit = true
      }
      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler)
        conn.ev.off("connection.update", conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
      }
      conn.handler = handler.handler.bind(conn)
      conn.connectionUpdate = connectionUpdate.bind(conn)
      conn.credsUpdate = saveCreds.bind(conn, true)
      conn.ev.on("messages.upsert", conn.handler)
      conn.ev.on("connection.update", conn.connectionUpdate)
      conn.ev.on("creds.update", conn.credsUpdate)
      isInit = false
      return true
    }
    creloadHandler(false)
  }
  serbot()
}

handler.command = ['dylux']

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
        }
