import fetch from 'node-fetch';

const handler = async (m, { text }) => {
    if (!text) throw 'Proporciona una pregunta.';

    const query = encodeURIComponent(text);
    const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/gemini?text=${query}`;

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        m.react('💬')

        if (result.status !== "true") throw 'Error al obtener la respuesta de la API.';

        const aiResponse = result.result;

        m.reply(aiResponse);
    } catch (error) {
        console.error(error);
        m.reply('Ocurrió un error al procesar tu solicitud.');
    }
};

handler.command = ['ia', 'gemini'];

export default handler;
