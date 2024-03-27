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
    'X-RapidAPI-Key': '843052fc5cmsh208d39312244a7dp186c7fjsn9a3bd5296dbd',
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
