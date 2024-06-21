const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/checkscam/contract';
exports.index = async (req, res, next) => {
const link = 'https://checkscam.com/contract';

    try {
        const { data } = await axios.get(link);

        const $ = cheerio.load(data);

        const items = [];

        $('table tbody tr').each((index, element) => {
            const unset = $(element).find('td').eq(1).text().trim();
            const cate = $(element).find('td').eq(2).text().trim();
            const money = $(element).find('td').eq(3).text().trim();
            const name = $(element).find('td').eq(4).text().trim();
            const status = $(element).find('div.intermediary-alert.alert.alert-danger').text().trim();
          const time = $(element).find('td').eq(6).text().trim();

            items.push({ unset, cate, money, name, status , time });
        });

        res.json({ items });
    } catch (error) {
        console.log('Lỗi:', error);
        res.status(500).send('Lỗi khi lấy thông tin từ máy chủ.');
    }
};
