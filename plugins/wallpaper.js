import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sentResults = [];

const handler = async (m, { text, conn }) => {
    if (!text) throw 'Comando mal usado, Ejemplo: .wallpaper ${botname}';

    const query = text.trim().replace(/ /g, '+');
    const url = `https://delirius-apiofc.vercel.app/search/wallpapers?q=${query}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw 'Error al conectar con la API';

        const json = await response.json();
        if (!json.status || !json.data || json.data.length === 0) {
            throw 'No se encontraron resultados';
        }

        const filteredData = json.data.filter(wallpaper => !sentResults.includes(wallpaper.image));

        if (filteredData.length === 0) {
            sentResults = [];
            throw 'No se encontraron nuevos resultados';
        }

        const wallpaper = filteredData[0];
        const { title, image } = wallpaper;

        sentResults.push(image);

        const imageResponse = await fetch(image);
        if (!imageResponse.ok) throw 'Error al descargar la imagen';

        const buffer = await imageResponse.buffer();
        const tempDir = path.join(__dirname, 'temp');

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const filePath = path.join(tempDir, `${Date.now()}.jpg`);

        fs.writeFileSync(filePath, buffer);

        await conn.sendFile(m.chat, filePath, 'wallpaper.jpg', `*Título:* ${title}`, m);

        fs.unlinkSync(filePath);

    } catch (error) {
        console.error(error);
        await m.reply(`Hubo un error: ${error}`);
    }
};

handler.command = ['wallpaper <txt>'];

export default handler;
