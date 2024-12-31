import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
  const consejoAleatorio = pickRandom(global.consejo);

  const buttons = [
    { buttonId: 'menu', buttonText: { displayText: 'Menú' }, type: 1 },
    { buttonId: 'siguiente', buttonText: { displayText: 'Siguiente' }, type: 1 },
  ];

  const buttonMessage = {
    text: `✦ ${consejoAleatorio}`,
    footer: '✦ FRASE / CONSEJO ✦',
    buttons: buttons,
    headerType: 1,
  };

  await conn.sendMessage(m.chat, buttonMessage);
};

handler.command = ['consejo'];
handler.help = ['consejo'];
handler.tags = ['fun'];

export default handler;

// Función para manejar botones
conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  if (!m.message) return;

  const buttonResponse = m.message.buttonsResponseMessage?.selectedButtonId;
  if (buttonResponse) {
    switch (buttonResponse) {
      case 'menu':
        await conn.reply(m.key.remoteJid, '🔖 Aquí va el menú (puedes personalizarlo).', m);
        break;

      case 'siguiente':
        const nuevoConsejo = pickRandom(global.consejo);
        const nuevoBotonMessage = {
          text: `✦ ${nuevoConsejo}`,
          footer: '✦ FRASE / CONSEJO ✦',
          buttons: [
            { buttonId: 'menu', buttonText: { displayText: 'Menú' }, type: 1 },
            { buttonId: 'siguiente', buttonText: { displayText: 'Siguiente' }, type: 1 },
          ],
          headerType: 1,
        };
        await conn.sendMessage(m.key.remoteJid, nuevoBotonMessage);
        break;
    }
  }
});

global.consejo = [
  'Recuerda que no puedes fallar en ser tú mismo (Wayne Dyer)',
  'Siempre es temprano para rendirse (Jorge Álvarez Camacho)',
  'Sólo una cosa convierte en imposible un sueño: el miedo a fracasar (Paulo Coelho)',
  'Lo que haces hoy puede mejorar todos tus mañanas (Ralph Marston)',
  'Las pequeñas acciones de cada día hacen o deshacen el carácter (Oscar Wilde)',
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
