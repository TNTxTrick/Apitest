const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/checkscam/search';
exports.index = async (req, res, next) => {
const q = req.query.q;

    if (!q) {
      return res.status(400).json({ error: 'Nhập SĐT, Email hoặc Số tài khoản để kiểm tra...' });
    }

    const link = `https://checkscam.com/scams?keyword=${q}`;

try {
        const { data } = await axios.get(link);

        const $ = cheerio.load(data);

        const text = $('div.alert.alert-danger.text-center').text().trim();

        res.json({ message: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error.');
    }
};
