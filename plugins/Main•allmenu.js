let handler = async (m, { conn }) => {
  let txt = `
*Hola 👋🏻 \`${global.nombre}\`*
*BOT OFC: +${global.ofcbot}*
  
*\`ɪɴꜰᴏ\`*

☆ *ᴘᴇʀꜰɪʟ*
☆ *ᴍᴇɴᴜ*

*\`ᴘᴏᴋᴇᴍᴏɴ 🧊🍃\`*

☆ *ᴘᴏᴋᴇᴍᴏɴ* <ʀᴇᴄʟᴀᴍᴀ ᴜɴ ᴘᴏᴋᴇᴍÓɴ>
☆ *ɪɴꜰᴏ-ᴘᴏᴋᴇᴍᴏɴ* <ᴠᴇʀ ᴛᴜ ᴘᴏᴋᴇᴍÓɴ>
☆ *ᴀʟɪᴍᴇɴᴛᴀʀ* <ᴀʟɪᴍᴇɴᴛᴀ ᴛᴜ ᴘᴏᴋᴇᴍÓɴ>
☆ *ᴇɴᴛʀᴇɴᴀʀ* <ᴇɴᴛʀᴇɴᴀ ᴛᴜ ᴘᴏᴋᴇᴍÓɴ>

*\`ᴀɪ\`*

☆ *ʀᴇᴍɪɴɪ*
☆ *ʜᴅ*
☆ *ᴇɴʜᴀɴᴄᴇ*
☆ *ᴡᴀʟʟᴘᴀᴘᴇʀ <ᴛxᴛ>*
☆ *ɢᴇᴍɪɴɪ / ɪᴀ*
☆ *ᴘɪxᴀɪ*

 *\`ʙᴜꜱQᴜᴇᴅᴀꜱ\`*

☆ *ɢᴏᴏɢʟᴇ <ʙÚꜱQᴜᴇᴅᴀ>*
☆ *ᴛɪᴋᴛᴏᴋꜱᴇᴀʀᴄʜ <ᴛxᴛ>*
☆ *ʏᴛꜱᴇᴀʀᴄʜ*
☆ *ɪᴍᴀɢᴇɴ <ᴛxᴛ>*
☆ *ᴘʟᴀʏ* <ᴍᴜꜱɪᴄᴀ>
☆ *ʏᴛᴅʟᴍᴘ4* <ɴᴏᴍʙʀᴇ>
☆ *ʏᴛᴅʟᴍᴘ3* <ɴᴏᴍʙʀᴇ>

‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌‍‌‍‌‍‌‍‌‍‌‌‍‍‍‍‌
 *\`ᴊᴜᴇɢᴏꜱ\`*

☆ *ᴀʙʀᴀᴢᴀʀ <@ᴛᴀɢ>*
☆ *ᴀᴄᴇʀᴛɪᴊᴏ*
☆ *ꜱᴏɴʀᴏᴊᴀʀꜱᴇ <@ᴛᴀɢ>*
☆ *ᴄᴏɴꜱᴇᴊᴏ*
☆ *ᴇɴᴀᴍᴏʀᴀᴅᴀ <@ᴛᴀɢ>*
☆ *ᴍᴇᴍᴇ*
☆ *ᴀᴄᴀʀɪᴄɪᴀʀ <@ᴛᴀɢ>*
☆ *ᴘᴇʀꜱᴏɴᴀʟɪᴅᴀᴅ*
☆ *ᴘɪʀᴏᴘᴏ*
☆ *ᴘᴏᴋᴇᴅᴇx <ᴘᴏᴋᴇᴍÓɴ>*
☆ *ᴘʀᴇɢᴜɴᴛᴀ*
☆ *ᴅᴏʀᴍɪʀ <@ᴛᴀɢ>*
☆ *ᴛʀɪꜱᴛᴇ <@ᴛᴀɢ>*
☆ *ᴛᴏᴘ <ᴛxᴛ>*
☆ *ᴢᴏᴅɪᴀᴄ <2010 03 15*

 *\`ᴊᴀᴅɪ / ʙᴏᴛꜱ\`*

☆ *ᴄᴏᴅᴇ* 
☆ *ꜱᴇʀʙᴏᴛ*
☆ *ᴇꜱᴛᴀᴅᴏ*

 *\`ʀᴘɢ\`*

☆ *ʙᴀʟ*
☆ *ᴄʀɪᴍᴇɴ*
☆ *ᴅᴀɪʟʏ*
☆ *ᴄʟᴀɪᴍ*
☆ *ᴅᴇᴘᴏꜱɪᴛᴀʀ*
☆ *ʟʙ*
☆ *ʀᴇᴛɪʀᴀʀ*
☆ *ʀᴏʙ2*
☆ *ʀᴏʙ*
☆ *ᴛʀᴀʙᴀᴊᴀʀ*
☆ *ʙᴜʏ*
☆ *ʙᴜʏ ᴀʟʟ*

 *\`ꜱᴛɪᴄᴋᴇʀꜱ\`*

☆ *Qᴄ*
☆ *ꜱᴛɪᴋᴇʀ <ɪᴍɢ>*
☆ *ꜱᴛɪᴄᴋᴇʀ <ᴜʀʟ>*
☆ *ᴛᴀᴋᴇ <ɴᴏᴍʙʀᴇ/ᴀᴜᴛᴏʀ>*

 *\`+18\`*

☆ *xɴxxꜱᴇᴀʀᴄʜ <ᴛxᴛ>*
☆ *xɴxxᴅʟ <ʟɪɴᴋ>*

 *\`ᴀɴɪᴍᴇꜱ\`*

☆ *ʀᴜʟᴇ34 <ᴛᴀɢ>*
☆ *ᴡᴀɪꜰᴜ*
☆ *ʜᴇɴᴛᴀɪꜱᴇᴀʀᴄʜ <Qᴜᴇʀʏ>*
☆ *ʜᴇɴᴛᴀɪᴅʟ <ʟɪɴᴋ / ɪᴅ>*

 *\`ɢʀᴜᴘᴏꜱ\`*

☆ *ʟɪɴᴋ*
☆ *ɢʀᴜᴘᴏ ᴏᴘᴇɴ / ᴄʟᴏꜱᴇ*
☆ *ᴅᴇʟᴇᴛᴇ*
☆ *ᴅᴇᴍᴏᴛᴇ*
☆ *ᴘʀᴏᴍᴏᴛᴇ*
☆ *ᴇɴᴄᴜᴇꜱᴛᴀ <ᴛxᴛ / ᴛxᴛ>*
☆ *ʜɪᴅᴇᴛᴀɢ*
☆ *ɪɴꜰᴏɢʀᴜᴘᴏ*
☆ *ᴋɪᴄᴋ*
☆ *ʟɪꜱᴛᴀᴅᴠ*
☆ *ᴛᴀɢᴀʟʟ <ᴛxᴛ>*
☆ *ɪɴᴠᴏᴄᴀʀ <ᴛxᴛ>*

 *\`ᴏɴ/ᴏꜰꜰ\`*

☆ *ᴇɴᴀʙʟᴇ*
☆ *ᴅɪꜱᴀʙʟᴇ*

 *\`ᴅᴇꜱᴄᴀʀɢᴀꜱ\`*

☆ *ꜰᴀᴄᴇʙᴏᴏᴋ - ꜰʙ*
☆ *ɪᴍᴀɢᴇɴ <ᴛxᴛ>*
☆ *ɪɴꜱᴛᴀɢʀᴀᴍ - ɪɢ*
☆ *ᴛɪᴋᴛᴏᴋ*
☆ *ʏᴛᴍᴘ4*
☆ *ʏᴛᴍᴘ3*

 *\`ʜᴇʀʀᴀᴍɪᴇɴᴛᴀꜱ\`*

☆ *ᴛᴏᴀɴɪᴍᴇ*
☆ *ʀᴇᴍɪɴɪ*
☆ *ʜᴅ*
☆ *ᴇɴʜᴀɴᴄᴇ*
☆ *ꜱꜱᴡᴇʙ*
☆ *ꜱꜱ*
☆ *ᴛʀᴀᴅ*

 *\`ᴄᴏɴᴠᴇʀᴛɪᴅᴏʀᴇꜱ\`*

☆ *ᴛᴏɢɪꜰᴀᴜᴅ*
☆ *ᴛᴏɪᴍɢ*
☆ *ᴛᴏᴀᴜᴅɪᴏ*

 *\`ᴀᴅᴍɪɴ\`*

☆ *ᴀᴅᴅᴘʀᴇᴍ2 <@ᴛᴀɢ> <ᴅᴀʏꜱ>*
☆ *ᴀᴅᴅʏᴇɴ2 <@ᴛᴀɢ>*`.trim();

m.react('✅');
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: botname, body: dev, thumbnailUrl: banner, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
};

handler.command = ['allmenu', 'menu', 'menuall', 'menucompleto'];

export default handler;
