exports.name = '/downinsta';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) {
    return res.status(400).json({ error: 'Thiếu đường dẫn Instagram để tải xuống' });
  }

  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
    params: {
      url: link
    },
    headers: {
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
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
