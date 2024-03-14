exports.name = '/downinsta';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) {
    return res.status(400).json({ error: 'Thiếu đường dẫn Instagram để tải xuống' });
  }

  const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://instagram-post-and-reels-downloader.p.rapidapi.com/',
  params: {
    url: 'https://www.instagram.com/reel/C0haD5YtZ4h/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=='
  },
  headers: {
    'X-RapidAPI-Key': 'c677a2e9e3msh9944fd67c431ac3p1e4ca3jsn693a78eab94d',
    'X-RapidAPI-Host': 'instagram-post-and-reels-downloader.p.rapidapi.com'
  }
};

  try {
    const response = await axios.request(options);
    return res.json(response.data);
  } catch (error) {
    console.error('Lỗi khi tải từ API:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi tải từ API' });
  }
};
