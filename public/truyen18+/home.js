const axios = require("axios");
const cheerio = require("cheerio");

exports.name = '/truyen18/home';
exports.index = async (req, res, next) => {
  try {
    const url = 'https://damconuong.net';
    const { data } = await axios.get(url);
    console.log("Successfully fetched data from URL"); // Debugging log

    const $ = cheerio.load(data);
    const responseData = [];

    $('div.relative').each((index, element) => {
      const img = $(element).find('img.rounded-t-lg.cover').attr('src');
      const title = $(element).find('a.text-white').text().trim();
      const link = $(element).find('a.text-white').attr('href');
      const chapnew = $(element).find('div.p-2 a').text().trim();
      const link_chapnew = $(element).find('div.p-2 a').attr('href');
      const update = $(element).find('span.text-gray-400.text-xs').text().trim();

      if (title && link) { // Check to ensure title and link are not undefined
        responseData.push({
          title: title,
          img: img,
          link: 'https://damconuong.net' + link,
          chapnew: chapnew,
          link_chapnew: 'https://damconuong.net' + link_chapnew,
          update: update
        });
      }
    });

    // Check if items array is populated and send the response data as JSON
    if (responseData.length > 0) {
      res.json(responseData);
    } else {
      console.error('No items found');
      res.status(500).json({ error: 'No items found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};


