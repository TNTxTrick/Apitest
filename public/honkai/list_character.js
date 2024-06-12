const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/honkai/list_character';
exports.index = async (req, res, next) => {
  const url = 'https://honkai-star-rail.fandom.com/vi/wiki/Wiki_Honkai:_Star_Rail';

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Extract names from span elements with specific class
    const names = [];
    $('span.card-text.card-font').each((i, element) => {
      names.push($(element).text().trim());
    });

    res.json({
      names: names
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
