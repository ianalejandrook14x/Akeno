const handler = async (m, { conn, args, command, isButton }) => {
    if (!isButton) {
        if (command === 'test') {
            const question = {
                text: "¿Te gust0o",
                image: "https://qu.ax/BWXFU.jpg",
                buttons: [
                    { buttonId: 'si', buttonText: { displayText: "si" }, type: 1 },
                    { buttonId: 'no', buttonText: { displayText: "no" }, type: 1 },
                    { buttonId: 'talvez', buttonText: { displayText: "talvez" }, type: 1 },
                ],
            };

            await conn.sendMessage(m.chat, {
                text: question.text,
                image: { url: question.image },
                buttons: question.buttons,
                headerType: 4,
            });
        }
    } else {
        const buttonResponses = {
            si: {
                text: "Que lindo ✨",
                image: "https://qu.ax/BWXFU.jpg",
            },
            color_blue: {
                text: "Que lastima ☁",
                image: "https://qu.ax/BWXFU.jpg",
            },
            color_green: {
                text: "Entiendo espero que te obseciones conmigo 🌸",
                image: "https://qu.ax/BWXFU.jpg",
            },
        };

        const response = buttonResponses[m.selectedButtonId];
        if (response) {
            await conn.sendMessage(m.chat, {
                text: response.text,
                image: { url: response.image },
                headerType: 4,
            });
        } else {
            await conn.sendMessage(m.chat, { text: "No entendí tu respuesta. 😅" });
        }
    }
};

handler.command = ['test'];

export default handler;
