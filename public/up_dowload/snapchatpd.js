const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/snapchatpd';
exports.index = async (req, res, next) => {
const url = req.query.url;
  if (!url) {
    return res.status(400).send('Please provide a URL as a query parameter');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi/snapchat?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let videoSrc = [];

    
    $('video source').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        videoSrc.push(src); 
      }
    });

    res.json({ videoSrc:videoSrc });
  } catch (error) {
    res.status(500).send('Error occurred while scraping');
  }
});
