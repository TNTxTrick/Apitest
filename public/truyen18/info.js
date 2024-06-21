const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/truyen18/info';
exports.index = async (req, res, next) => {
const link = req.query.link;
  if (!link || !link.startsWith('https://damconuong.net/')) {
    return res.status(400).json({ error: 'Invalid or missing link parameter' });
  }

  try {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);

    const title = $('div.flex.flex-row.truncate.mb-4 h1').text().trim();
    const name_k = $('div.grow span').eq(1).text().trim();
    const author = $('div.mt-2 span').eq(3).text().trim();
    const status = $('div.mt-2 span.text-blue-500').text().trim();
    const updatetime = $('span.timeago').attr('datetime');
    const view = $('div.mt-2 span').eq(11).text().trim();
    const content = $('div.manga-pilot p').text().trim();
    const chapter_list = $('h2.grow.text-lg.ml-1.text-ellipsis.font-semibold').text();

    const chapters = [];
    $('ul.overflow-y-auto.overflow-x-hidden a').each((index, element) => {
      const chapterLink = $(element).attr('href');
      chapters.push({
        link: 'https://damconuong.net' + chapterLink
      });
    });

    res.json({
      title: title,
      author: author,
      name_k: name_k,
      status: status,
      updatetime: updatetime,
      view: view,
      content: content,
      chapter_list: chapter_list,
      chapters: chapters
    });

  } catch (error) {
    console.error('Error during data fetch or processing:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
