let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
  case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break

  case 'antiPrivate':
    case 'antiprivado':
    case 'antipriv':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
      bot.antiPrivate = isEnable
      break

  case 'restrict':
    case 'restringir':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
      bot.restrict = isEnable
      break

 case 'antibot':
    case 'antibots':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break

 case 'antisubbots':
    case 'antisub':
    case 'antisubot':
    case 'antibot2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot2 = isEnable
      break

 case 'antifake':
    case 'antifakes':
    case 'antiarabes':
    case 'antiarab':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.onlyLatinos = isEnable
      break

 case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.modoadmin = isEnable
      break

 case 'autoread':
    case 'autoleer':
    case 'autover':
      isAll = true
       if (!isROwner) {
         global.dfail('rowner', m, conn)
         throw false
      }
      global.opts['autoread'] = isEnable
      break

  case 'antiver':
    case 'antiocultar':
    case 'antiviewonce':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiver = isEnable
      break

  case 'reaction':
    case 'reaccion':
    case 'emojis':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.reaction = isEnable
      break

  case 'audios':
    case 'audiosbot':
    case 'botaudios':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.audios = isEnable
      break

  case 'antiSpam':
    case 'antispam':
    case 'antispamosos':
     isAll = true
      if (!isOwner) {
      global.dfail('rowner', m, conn)
      throw false
      }
      bot.antiSpam = isEnable
      break

   case 'antidelete': 
     case 'antieliminar': 
     case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
       global.dfail('admin', m, conn)
       throw false
     }}
     chat.delete = isEnable
     break

  case 'autobio':
    case 'status':
    case 'bio':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      bot.autobio = isEnable
      break

  case 'jadibotmd':
    case 'serbot':
    case 'subbots':
     isAll = true
        if (!isOwner) {
          global.dfail('rowner', m, conn)
          throw false
      }
      bot.jadibotmd = isEnable
      break

  case 'detect':
    case 'configuraciones':
    case 'avisodegp':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break

  case 'simi':
    case 'autosimi':
    case 'simsimi':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.simi = isEnable
      break

    case 'document':
    case 'documento':
    isUser = true
    user.useDocument = isEnable
    break

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break

      case 'nsfw':
      case 'modohorny':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
            throw false
           }}
    chat.modohorny = isEnable          
    break
    default:
      if (!/[01]/.test(command)) return conn.reply(m.chat, `
*✧ Funciones solo para owner*

*${usedPrefix + command} status* 🎋
> ➤ *La función cambia la descripción del usuario reemplazando por una nueva*

*${usedPrefix + command} restrict* 🎋
> ➤ *La función activa o desactiva los comandos restringidos*

*${usedPrefix + command} autoread* 🎋
> ➤ *Esta función permite que la lectura sea automatica*

*${usedPrefix + command} antiprivado* 🎋
> ➤ *Esta función permite bloquear a usuarios que escriben al privado del bot de manera automatica*

*${usedPrefix + command} subbots* 🎋
> ➤ *Esta función activa o desactiva la opción para convertirse en Jadibot*

*✧ Funciones de grupos*

*${usedPrefix + command} reaccion* 🎋
> ➤ *Esta función permita para que el bot pueda reaccionar a mensajes con cualquier emoji*
 
*${usedPrefix + command} antitraba* 🎋
> ➤ *Esta función permite eliminar a usuarios que tengan textos que contengan muchos caracteres*

*${usedPrefix + command} modoadmin* 🎋
> ➤ *Esta función permite que solo administradores del grupo puedan utilizar el bot*

*${usedPrefix + command} antiarabes* 🎋
> ➤ *Esta función cuando esta activa elimina a los usuarios arabes cuando mandan un mensaje automaticamente*

*${usedPrefix + command} autoread* 🎋
> ➤ *Solo esta disponible para Jadibot o bot general trata de leer mensajes de grupos o chats cuando ingresan algun comando*

*${usedPrefix + command} antiver* 🎋
> ➤ *Esta función permite que un usuario que mando una imagen o video para 1 sola vez, el bot lo envia sin restricción*

*${usedPrefix + command} detect* 🎋
> ➤ *Esta función solo esta disponible para grupos cuando alguien realiza algun cambio en el grupo el bot lo detecta*

*${usedPrefix + command} delete* 🎋
> ➤ *Esta función permite enviar el mensaje, imagen o video que algun usuario haya eliminado*

*${usedPrefix + command} nsfw* 🎋
> ➤ *Esta función permite activar los comandos +18*

*${usedPrefix + command} welcome* 🎋
> ➤ *Esta función permite a los nuevo usuarios que sean recibidos por un mensaje de bienvenida*

*${usedPrefix + command} antibot* 🎋
> ➤ *Esta función permite eliminar a todos los bots que se encuentren activo en el grupo*

*${usedPrefix + command} antilink* 🎋
> ➤ *Esta función elimina a los usuarios que hayan enviado algun link de algn grupo o canal*`, m, )
      throw false
  }
  conn.reply(m.chat, `✧ La función *${type}* se *${isEnable ? 'activó' : 'desactivó'}* ${isAll ? 'para este Bot' : isUser ? '' : 'para este chat'}`, m, )
}

handler.help = ['enable', 'disable']
handler.command = ['enable', 'disable', 'on', 'off', '1', '0']

export default handler
