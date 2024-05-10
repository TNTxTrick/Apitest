exports.name = '/igstory';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://instagram-post-reels-stories-downloader.p.rapidapi.com/instagram/',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': '15375c47d5msh3698cbdb105ac9bp167948jsn5ac92ee40cca',
    'X-RapidAPI-Host': 'instagram-post-reels-stories-downloader.p.rapidapi.com'
  }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ Pinterest' });
  }
};
