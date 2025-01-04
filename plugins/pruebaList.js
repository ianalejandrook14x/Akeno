let handler = async (m, { conn, isRowner }) => {
const { prepareWAMessageMedia, generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const { randomBytes } = require("crypto");
const { imageMessage } = await prepareWAMessageMedia({
    image: { url: "https://qu.ax/sEMLW.jpg" }
}, { upload: conn.waUploadToServer });

const sections = [
    {
        title: "Tags Relacionados",
        rows: [
            {
                title: 'Menu',
                description: "Menu principal",
                id: ".menu",
            },
            {
                title: 'Setbannee',
                description: "cambiar banner",
                id: ".setbanner",
            },
            {
                title: 'Setname',
                description: "Cambiar el nombre",
                id: ".setname",
            },
            {
                title: '.setwelcome',
                description: "configurar bienvenida",
                id: ".setwelcome",
            },
            {
                title: 'Setcurrency',
                description: "cambiar la moneda del bot",
                id: ".setcurrency",
            },
        ],
    },
];

const listButton = {
    name: "Lista",
    buttonParamsJson: JSON.stringify({
        title: "Selecciona una opción",
        sections: sections,
    }),
};

const additionalButtons = [
    {
        buttonId: ".code",
        buttonText: { displayText: "CODE" }
    },
    {
        buttonId: ".serbot",
        buttonText: { displayText: "SERBOT" }
    }
];

const messageContent = {
    interactiveMessage: {
        body: { text: 'Akeno Himejima' },
        footer: { text: 'Selecciona una opción' },
        header: {
            title: 'Prueba test',
            subtitle: 'Akeno',
            hasMediaAttachment: true,
            imageMessage: imageMessage 
        },
        nativeFlowMessage: {
            buttons: [
                listButton,
                ...additionalButtons.map(btn => ({
                    name: btn.buttonId,
                    buttonParamsJson: JSON.stringify({
                        text: btn.buttonText.displayText
                    }),
                }))
            ],
            messageParamsJson: "{}",
            messageVersion: 1
        }
    },
    messageContextInfo: {
        messageSecret: randomBytes(32)
    }
};

const message = generateWAMessageFromContent(m.chat, messageContent, { userJid: conn.user.id });
await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

handler.command = ['test2']
export default handler
