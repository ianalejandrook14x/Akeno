const searchHistory = {};

async function tiktokSearch(query) {
  const apiUrl = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== 200) {
      throw new Error('Error en la búsqueda');
    }

    if (!searchHistory[query]) {
      searchHistory[query] = {
        shownIds: new Set(),
        data: data.meta
      };
    }

    const { shownIds, data: results } = searchHistory[query];

    const newResults = results.filter(video => !shownIds.has(video.id));

    if (newResults.length === 0) {
      searchHistory[query].shownIds.clear();
      return results[0];  
    }

    const nextResult = newResults[0];
    shownIds.add(nextResult.id);

    return nextResult;
  } catch (error) {
    return { error: error.message };
  }
}

const handler = async (m, { text, conn }) => {
  if (!text) {
    throw '*Proporciona un nombre para realizar una busqueda*';
  }

  const result = await tiktokSearch(text);

  if (result.error) {
    return m.reply(`Error: ${result.error}`);
  }

  const videoUrl = result.hd;
  const caption = `*Título:* ${result.title}\n\n*Autor:* ${result.author.username} (${result.author.nickname})\n\n*Reproducciones:* ${result.play}\n\n*Likes:* ${result.like}`;
  
  await conn.sendFile(m.chat, videoUrl, 'video.mp4', caption, m);
};

handler.command = ['tiktoksearch <txt>'];

export default handler;
