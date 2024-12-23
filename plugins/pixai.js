const fetch = require("node-fetch");

export default handler = {
  name: "pixai",
  alias: ["pixai", "pix"],
  category: "search",
  use: "<query>",
  example: "%cmd akeno gremory",
  isSpam: true,
  isQuery: true,
  
  async run({ conn, msg }, { query }) {
    const apiUrl = `https://api.dorratz.com/v2/pix-ai?prompt=${encodeURIComponent(query)}`;
    
    try {
      const response = await fetch(apiUrl);
      
       if (!response.ok) {
        throw new Error('Error en la red: ' + response.status);
      }

      const data = await response.json();
       if (!data.images || data.images.length === 0) {
        return msg.reply(`*No se encontraron imágenes*`);
      }
      
    data.images.forEach((imageUrl) => {
        conn.sendMessage(msg.from, { image: { url: imageUrl } }, { quoted: msg });
      });

      
    } catch (error) {
      console.error('Error:', error);
      msg.reply(`*Ocurrió un error*`);
    }
  }
};
