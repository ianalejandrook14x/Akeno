import { prepareWAMessageMedia, generateWAMessageFromContent } from "@whiskeysockets/baileys";
import { randomBytes } from "crypto";

const { imageMessage } = await prepareWAMessageMedia({
    image: { url: "https://i.pinimg.com/736x/1c/b9/dc/1cb9dce731c1544b0bd018b02567fd1f.jpg" }
}, { upload: conn.waUploadToServer });

const sections = [
    {
        title: "Tags Relacionados",
        rows: [
            {
                title: 'Opción 1',
                description: "Descripción de la opción 1",
                id: "option1_id",
            },
            {
                title: 'Opción 2',
                description: "Descripción de la opción 2",
                id: "option2_id",
            },
            {
                title: 'Opción 3',
                description: "Descripción de la opción 3",
                id: "option3_id",
            },
            {
                title: 'Opción 4',
                description: "Descripción de la opción 4",
                id: "option4_id",
            },
            {
                title: 'Opción 5',
                description: "Descripción de la opción 5",
                id: "option5_id",
            },
        ],
    },
];

const listButton = {
    name: "single_select",
    buttonParamsJson: JSON.stringify({
        title: "Selecciona una opción",
        sections: sections,
    }),
};
const additionalButtons = [
    {
        buttonId: ".ping",
        buttonText: { displayText: "PING" }
    },
    {
        buttonId: ".play2 felices los 4",
        buttonText: { displayText: "Play" }
    }
];

// Crear el contenido del mensaje
const messageContent = {
    interactiveMessage: {
        body: { text: 'Aquí está la imagen con un botón de lista' },
        footer: { text: 'Selecciona una opción' },
        header: {
            title: 'Título de la Imagen',
            subtitle: 'Subtítulo de la Imagen',
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

const handler = {};
handler.command = ['test']; 
handler.mods = true;

export default handler;
