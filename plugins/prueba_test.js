const handler = async (m, { conn, args, command }) => {
    if (command === 'test') {
        const questions = [
            {
                text: "Te gusta Akeno Himejima??",
                image: "https://qu.ax/BWXFU.jpg",
                buttons: [
                    { buttonId: 'Si', buttonText: { displayText: "Rojo" }, type: 1 },
                    { buttonId: 'No', buttonText: { displayText: "Azul" }, type: 1 },
                    { buttonId: 'talvez', buttonText: { displayText: "Verde" }, type: 1 },
                ],
            },
        ];
        for (const question of questions) {
            await conn.sendMessage(m.chat, {
                text: question.text,
                image: { url: question.image },
                buttons: question.buttons,
                headerType: 4,
            });
        }
    }
};

handler.command = ['test'];

export default handler;
