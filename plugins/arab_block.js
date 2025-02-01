const arabPrefixes = ['+212', '+213', '+216', '+218', '+20', '+970', '+963', '+966', '+967', '+968', '+971', '+972', '+973', '+974', '+975', '+976', '+977']; 
const handler = async (m, { conn }) => {
    const sender = m.sender;
    
    if (arabPrefixes.some(prefix => sender.startsWith(prefix))) {
        if (!m.isGroup) {
            await conn.updateBlockStatus(sender, 'block');
        }
        return;
    }
};

handler.before = handler;

export default handler;
