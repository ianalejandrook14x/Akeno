const xpperyenes = 350;
const handler = async (m, {conn, command, args}) => {
  let count = command.replace(/^buy/i, '');
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperyenes) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
  count = Math.max(1, count);
  if (global.db.data.users[m.sender].exp >= xpperyenes * count) {
    global.db.data.users[m.sender].exp -= xpperyenes * count;
    global.db.data.users[m.sender].yenes += count;
    conn.reply(m.chat, `*Haz comprado*: + ${count}💴
    *Gastado en total*: -${xpperyenes * count} XP`, m, );
  } else conn.reply(m.chat, `No tienes suficiente xp para comprar *${count}* Yenes 💴`, m, );
};
handler.help = ['Buy', 'Buyall'];
handler.tags = ['xp'];
handler.command = ['buy', 'buyall'];

handler.disabled = false;

export default handler;
