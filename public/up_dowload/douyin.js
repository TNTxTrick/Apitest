const axios = require("axios");
const cheerio = require("cheerio");

exports.name = '/douyin';

exports.index = async (req, res, next) => {
  const url = req.query.url;
  try {
    const { data } = await axios.get(`https://dlpanda.com/vi?token=G7eRpMaa&url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let scrapedData = [];
    let imgSrc = [];

    $('.col-md-12.col-lg-6 img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        imgSrc.push(src); 
      }
    });

    $('video source').each((index, element) => {
      const videoUrl = $(element).attr('src');
      if (videoUrl) {
        scrapedData.push({ url: 'https:' + videoUrl });
      }
    }); // Added closing parenthesis here

    res.json({ videos: scrapedData, images: imgSrc });
  } catch (error) {
    res.status(500).send('Lỗi');
  }
};
