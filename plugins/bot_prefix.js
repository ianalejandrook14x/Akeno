const handler = async (m, { usedPrefix, command, plugins }) => {
    let text = m.text.trim();
    let prefix = usedPrefix || '';

    let cmd = text.startsWith(prefix) ? text.slice(prefix.length).split(' ')[0] : text.split(' ')[0];

    let plugin = plugins[cmd];
    if (plugin) {
        await plugin(m);
    }
};

export default handler;
