const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/checkscam/scams';
exports.index = async (req, res, next) => {
const link = 'https://checkscam.com/scams';

    try {
        const { data } = await axios.get(link);

        const $ = cheerio.load(data);

        const items = [];

        $('div.scam-card').each((index, element) => {
            const name = $(element).find('div.limit').text().trim();
            const money = $(element).find('div.scam-column.scam-price').text().trim();
            const phone = $(element).find('div.scam-column.scam-text').eq(0).text().trim();
            const id = $(element).find('div.scam-column.scam-text').eq(1).text().trim();
            const bank = $(element).find('div.scam-column.scam-text').eq(2).text().trim();
            const view = $(element).find('div.scam-column.scam-text').eq(3).text().trim();
            const timeago = $(element).find('div.scam-column.scam-text').eq(4).text().trim();
            const link = $(element).find('a').attr('href');

            items.push({ name , money , phone , id , bank , view , timeago , link });
        });

        res.json({ items });
    } catch (error) {
        console.log('Lỗi:', error);
        res.status(500).send('Lỗi khi lấy thông tin từ máy chủ.');
    }
};
