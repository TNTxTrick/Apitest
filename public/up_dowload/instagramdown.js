exports.name = '/instagramdown';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
  const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://instagram-story-downloader-media-downloader.p.rapidapi.com/index',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': 'b1b134d34cmsh9196ad10efa01eap12279cjsn01b3c727f546',
    'X-RapidAPI-Host': 'instagram-story-downloader-media-downloader.p.rapidapi.com'
  }
};

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ Instagram' });
  }
};
