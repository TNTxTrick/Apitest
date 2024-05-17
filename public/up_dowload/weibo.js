const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/weibo';
exports.index = async (req, res, next) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Please provide a URL as a query parameter');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi/weibo?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let imgSrc = [];

    $('.col-md-12.col-lg-6 img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        imgSrc.push(src); 
      }
    });

    res.json({ imgSrc: imgSrc });
  } catch (error) {
    res.status(500).send('Error occurred while scraping');
  }
};
