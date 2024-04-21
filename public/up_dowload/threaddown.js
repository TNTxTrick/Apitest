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
    'X-RapidAPI-Key': 'b1b134d34cmsh9196ad10efa01eap12279cjsn01b3c727f546',
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
