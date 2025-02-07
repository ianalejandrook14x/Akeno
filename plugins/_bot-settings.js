const activeBots = new Map();

const handler = async (m, { conn, isOwner, isAdmin }) => {
    if (!m.isGroup) return;

    const groupId = m.chat;
    const botNumber = conn.user.jid;

    if (isAdmin && !activeBots.has(groupId)) {
        activeBots.set(groupId, botNumber);
    }

    if (activeBots.has(groupId)) {
        const activeBot = activeBots.get(groupId);
        if (activeBot !== botNumber && !(isAdmin && activeBot !== botNumber)) {
            return;
        }
    } else {
        activeBots.set(groupId, botNumber);
    }

    try {
        const isCommand = m.text.startsWith('/');

        if (isCommand) {
            if (isAdmin) {
            } else {
            }
        } else {
            if (!isAdmin) {
            } else {
            }
        }
    } catch (error) {
        console.error(`Error en el bot ${botNumber}:`, error);
        activeBots.delete(groupId);
    }
};

export default handler;
