const handler = async (m, { conn, command }) => {
    if (command === 'test') {
        // Menú principal
        const sections = [
            {
                title: "Opciones del bot",
                rows: [
                    { title: "Menu", rowId: "/allmenu", description: "Menu principal" },
                    { title: "setname", rowId: "/setname", description: "Cambiar nombre del bot" },
                    { title: "setwelcome", rowId: "/setwelcome", description: "Configurar bienvenida" },
                    { title: "setbanner", rowId: "/setbanner", description: "Cambiar imagen del bot" },
                    { title: "setcurrency", rowId: "/setcurrency", description: "Cambiar el nombre de la moneda" },
                ],
            },
        ];

        const listMessage = {
            text: "Selecciona el menú que deseas ver:",
            footer: "Menú interactivo del bot ✨",
            title: "Sistema de Menús",
            buttonText: "Elige un menú",
            sections,
        };

        await conn.sendMessage(m.chat, listMessage);
    } else {
        // Contenidos de los diferentes menús
        const menus = {
            menu_1: {
                text: "📜 *Menú Principal*\n\n1️⃣ Opción 1\n2️⃣ Opción 2\n3️⃣ Opción 3\n\n🔗 *Comandos disponibles:* /comando1, /comando2",
            },
            menu_2: {
                text: "📜 *Menú 2*\n\n1️⃣ Detalle 1\n2️⃣ Detalle 2\n3️⃣ Detalle 3\n\n🔗 *Comandos disponibles:* /comandoA, /comandoB",
            },
            menu_3: {
                text: "📜 *Menú 3*\n\n1️⃣ Info 1\n2️⃣ Info 2\n3️⃣ Info 3\n\n🔗 *Comandos disponibles:* /comandoX, /comandoY",
            },
            menu_4: {
                text: "📜 *Menú 4*\n\n1️⃣ Sección 1\n2️⃣ Sección 2\n3️⃣ Sección 3\n\n🔗 *Comandos disponibles:* /comandoP, /comandoQ",
            },
            menu_5: {
                text: "📜 *Menú 5*\n\n1️⃣ Más info 1\n2️⃣ Más info 2\n3️⃣ Más info 3\n\n🔗 *Comandos disponibles:* /comandoExtra",
            },
        };

        const response = menus[m.selectedRowId];
        if (response) {
            await conn.sendMessage(m.chat, { text: response.text });
        } else {
            await conn.sendMessage(m.chat, { text: "No entendi la seleccion" });
        }
    }
};

handler.command = ['snelist']; 
handler.row = true;

export default handler;
