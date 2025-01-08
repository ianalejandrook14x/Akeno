let handler = async (m, { conn, isRowner }) => {
    const newCurrency = m.text.trim().split(' ').slice(1).join(' ');

    if (!newJadicurrency) {
        return m.reply('*Proporciona una nueva moneda (por ejemplo, USD, EUR)*');
    }

    const userId = m.sender;
    if (!global.subbots) global.subbots = {};

    if (!global.subbots[userId]) {
      return m.reply('*Este comando solo puede ser usado por el dueño del PreBot*');
    }

    global.subbots[userId].currency = newJadicurrency;
    m.reply(`*La moneda de tu subbot ha sido actualizada a: ${newJadicurrency}*`);
};

handler.help = ['setcurrency'];
handler.tags = ['customization'];
handler.command = ['setcurrency'];
handler.mods = false;

export default handler;
