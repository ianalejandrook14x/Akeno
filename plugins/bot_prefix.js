const handler = async (m, { conn, usedPrefix, commands }) => {
    let text = m.text.trim(); 

    let availableCommands = Object.keys(commands);

    let cmd = text.split(' ')[0].replace(usedPrefix, '');

    if (availableCommands.includes(cmd)) {
        let plugin = commands[cmd]; 
        if (plugin) {
            await plugin(m, { conn });
        }
    }
};

export default handler;
