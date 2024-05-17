const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/douyinpd';
exports.index = async (req, res, next) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Please provide a URL as a query parameter');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi?token=G7eRpMaa&url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let scrapedData = [];

    
    $('video source').each((index, element) => {
      const videoUrl = $(element).attr('src');
      scrapedData.push({ videoUrl });
    });

    res.json(scrapedData);
  } catch (error) {
    res.status(500).send('Error occurred while scraping');
  }
};
