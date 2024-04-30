const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/ff/news/:id';

exports.index = async (req, res, next) => {
  const id = req.params.id; 
  try {
    const response = await axios.get(`https://ff.garena.com/vn/article/${id}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const date = $('span.m-date').text();
    const title = $('div.banner-mode h1.title').text();
    const content = $('div.article-content').text().trim(); // Adjust selector to match article content
    const img = $('span img').attr('src');
    const figureImg = $('figure img').attr('src');

    console.log('Title:', title);

    const images = [];
    if (img) images.push(img);
    if (figureImg) images.push(figureImg);

    const responseData = {
      date: date,
      title: title,
      content: content,
      images: images
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Error fetching data' });
  }
};


