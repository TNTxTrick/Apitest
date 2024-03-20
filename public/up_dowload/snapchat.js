const keyAPi = ['d0ab76bc06msh5032ca2f6f3baf9p15f9d8jsn024d834a55cb','c677a2e9e3msh9944fd67c431ac3p1e4ca3jsn693a78eab94d'];
const getRandomKey = () => keyAPi[Math.floor(Math.random() * keyAPi.length)];

exports.name = '/snapchat';
exports.index = async(req, res, next) => {
const link = req.query.link;
if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://download-snapchat-video-spotlight-online.p.rapidapi.com/download',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': getRandomKey(), 
    'X-RapidAPI-Host': 'download-snapchat-video-spotlight-online.p.rapidapi.com'
  }
};

try {
      const response = await axios.request(options);
      console.log(response.data);
      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.json({ error: 'Có lỗi xảy ra khi tải từ API' });
    }
  };
