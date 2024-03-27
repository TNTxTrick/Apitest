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
    'X-RapidAPI-Key': '47a23919a4msh78b95d902d5a830p12dcddjsnf8bcbe88ed59',
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
