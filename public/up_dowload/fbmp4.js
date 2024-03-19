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
    'X-RapidAPI-Key': 'c677a2e9e3msh9944fd67c431ac3p1e4ca3jsn693a78eab94d',
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
