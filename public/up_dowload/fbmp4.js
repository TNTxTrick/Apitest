const keyAPi = ['fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d','d0ab76bc06msh5032ca2f6f3baf9p15f9d8jsn024d834a55cb','b619707d57mshc1e2f8dec3870ecp12e04cjsnb42dfa0c28ca','c677a2e9e3msh9944fd67c431ac3p1e4ca3jsn693a78eab94d'];
const getRandomKey = () => keyAPi[Math.floor(Math.random() * keyAPi.length)];

exports.name = '/fbmp4';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://facebook-video-and-reel-downloader.p.rapidapi.com/',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': getRandomKey(),
    'X-RapidAPI-Host': 'facebook-video-and-reel-downloader.p.rapidapi.com'
  }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ API' });
  }
};
