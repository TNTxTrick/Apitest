exports.name = '/tikmusic';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tiktok-api15.p.rapidapi.com/index/Tiktok/getMusicInfo',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': 'd0ab76bc06msh5032ca2f6f3baf9p15f9d8jsn024d834a55cb',
    'X-RapidAPI-Host': 'tiktok-api15.p.rapidapi.com'
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
