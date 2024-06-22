const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/checkweb';
exports.index = async (req, res, next) => {
const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL query parameter is required.');
    }

    const link = `https://scam.vn/check-website?domain=${url}`;

    try {
        const { data } = await axios.get(link);
        const $ = cheerio.load(data);

        const date = $('h6').eq(0).text();
      const dislike = $('span.badge.badge-pill.badge-light').eq(0).text();
      const like = $('span.badge.badge-pill.badge-light').eq(1).text();
      let ut = $('div.col-md-12.bg-success.p-3').text();
       ut = ut.replace(/\n/g, '').trim();

        if (date) {
            res.json({ date , dislike , like , ut });
        } else {
            res.status(404).send('No matching data found.');
        }
    } catch (error) {
        console.error('Error fetching the page:', error);
        res.status(500).send('An error occurred while fetching the page.');
    }
};
