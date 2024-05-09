exports.name = '/downthread';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' }); 
  const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://threads-photo-video-crawler.p.rapidapi.com/media',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': '15375c47d5msh3698cbdb105ac9bp167948jsn5ac92ee40cca',
    'X-RapidAPI-Host': 'threads-photo-video-crawler.p.rapidapi.com'
  }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải video từ API' });
  }
};
