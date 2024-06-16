const axios = require("axios");
const cheerio = require("cheerio");

exports.name = '/truyen18+/home';
exports.index = async (req, res, next) => {
  try {
    const url = 'https://damconuong.net';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const items = [];

    $('div.relative').each((index, element) => {
      const img = $(element).find('img.rounded-t-lg.cover').attr('src');
      const title = $(element).find('a.text-white').text().trim();
      const link = $(element).find('a.text-white').attr('href');
      const chapnew = $(element).find('div.p-2 a').text().trim();
      const link_chapnew = $(element).find('div.p-2 a').attr('href');
      const update = $(element).find('span.text-gray-400.text-xs').text().trim();

      const found = items.some(item => item.title === title);

      if (!found) {
        items.push({
          title: title,
          img: img,
          link: 'https://damconuong.net' + link,
          chapnew: chapnew,
          link_chapnew: 'https://damconuong.net' + link_chapnew,
          update: update
        });
      }
    });

    return items;
  } catch (error) {
    console.error('Error occurred while scraping:', error);
    throw error; // Ensure error is propagated for proper error handling
  }
};
 
