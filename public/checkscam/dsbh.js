const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/checkscam/dsbh';
exports.index = async (req, res, next) => {
  const link = 'https://checkscam.com/trusted';

    try {
        const { data } = await axios.get(link);

        const $ = cheerio.load(data);

        const items = [];

        $('h3').each((index, element) => {
            const name = $(element).text().trim();
            const link = $('a').eq(index).attr('href');
            const image = $('div.ratio.ratio-1x1.overflow-hidden.rounded-3 img').eq(index).attr('src');

            items.push({ name, link, image });
        });

        res.json({ items });
    } catch (error) {
        console.log('Lỗi:', error);
        res.status(500).send('Lỗi khi lấy thông tin từ máy chủ');
    }
};
