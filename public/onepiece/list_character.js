const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/onepiece/list_character';
exports.index = async (req, res, next) => {
  const url = 'https://onepiece.fandom.com/vi/wiki/Thể_loại:Nhân_vật';

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Extract names from span elements with specific class
    const names = $('a.category-page__member-link').text();

    res.json({
      names: names
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
