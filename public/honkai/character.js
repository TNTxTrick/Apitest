const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/honkai/character/:name';
exports.index = async (req, res, next) => {
  const name = req.params.name;
  const url = `https://honkai-star-rail.fandom.com/vi/wiki/${name}`;

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const story = $('div.srw-description-content').text().trim();
    const characterName = $('h2.pi-item.pi-item-spacing.pi-title.pi-secondary-background').text().trim();
    const realName = $('div.pi-data-value.pi-font').eq(3).text().trim();
    const destiny = $('div.pi-data-value.pi-font').eq(1).text().trim();
    const properties = $('div.pi-data-value.pi-font').eq(2).text().trim();
    const species = $('div.pi-data-value.pi-font').eq(4).text().trim();
    const parties = $('div.pi-data-value.pi-font').eq(5).text().trim();
    const world = $('div.pi-data-value.pi-font').eq(6).text().trim();
    const meetingDay = $('div.pi-data-value.pi-font').eq(8).text().trim();
    const img = $('img').attr('src');

    res.json({
      story: story,
      name: characterName,
      real_name: realName,
      destiny: destiny,
      properties: properties,
      img: img,
      species: species,
      parties: parties,
      world: world,
      meeting_day: meetingDay
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching the character data.' });
  }
};
