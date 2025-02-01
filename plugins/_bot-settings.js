const activeBots = new Map(); 
const handler = async (m, { conn, isOwner }) => {
    if (!m.isGroup) return; 

    const groupId = m.chat;
    const botNumber = conn.user.jid;

    if (activeBots.has(groupId) && activeBots.get(groupId) !== botNumber) {
        return;
    }

    activeBots.set(groupId, botNumber);

    try {
    } catch (error) {
        console.error(`Error en el bot ${botNumber}:`, error);
        activeBots.delete(groupId); 
    }

    setTimeout(() => {
        activeBots.delete(groupId);
    }, 60000);
};

export default handler;
