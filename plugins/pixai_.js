import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
    if (!text) throw 'Comando mal usado, ejemplo: .pixai Nakano Nino';

    const query = text.trim().replace(/ /g, '+');
    const url = `https://api.dorratz.com/v2/pix-ai?prompt=anime+${query}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al conectar con la API: ${response.status} ${response.statusText}`);

        const json = await response.json();
        if (!json.images || json.images.length === 0) {
            throw 'No se encontraron resultados para tu búsqueda.';
        }

        const images = json.images.slice(0, 3);

        for (const image of images) {
            const imageResponse = await fetch(image);
            if (!imageResponse.ok) throw new Error(`Error al descargar la imagen: ${imageResponse.status} ${imageResponse.statusText}`);

            const buffer = await imageResponse.buffer();

            await conn.sendMessage(m.chat, { image: buffer, caption: `*Resultados* 🎋` }, { quoted: m });
        }

    } catch (error) {
        console.error('Error:', error);
        await m.reply(`Hubo un error: ${error.message || error}`);
    }
};

handler.command = ['pixai'];

export default handler;
