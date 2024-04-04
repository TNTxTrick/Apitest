exports.name = '/bxhmusic';
const axios = require('axios');
const cheerio = require('cheerio');

exports.index = async (req, res, next) => {
    const limit = req.query.limit; 
    axios.get('https://www.nhaccuatui.com/top100/top-100-nhac-tre.m3liaiy6vVsF.html')
    .then(({ data }) => {
        const $ = cheerio.load(data);
        const images = [];

        
        $('div > a > img').each((index, element) => {
            const img = $(element);
            const src = img.attr('data-src');
            const title = img.attr('title');
            const link = img.parent().attr('href');
            
            
            images.push({ src, title, link });
        });

        
        const limitedImages = limit ? images.slice(0, limit) : images;

        res.jsonp(limitedImages);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
    });
};
