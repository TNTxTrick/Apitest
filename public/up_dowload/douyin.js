exports.name = '/douyin';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' }); 
  const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://douyin-media-no-watermark1.p.rapidapi.com/v1/social/douyin/web/aweme/detailurl',
  headers: {
    'x-rapidapi-key': '15375c47d5msh3698cbdb105ac9bp167948jsn5ac92ee40cca',
    'x-rapidapi-host': 'douyin-media-no-watermark1.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    url: link
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
