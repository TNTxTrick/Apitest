const axios = require('axios');

exports.name = '/fb';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });

  const options = {
    method: 'GET',
    url: 'https://facebook-video-audio-download.p.rapidapi.com/geturl',
    params: {
      video_url: link
    },
    headers: {
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'facebook-video-audio-download.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ Facebook' });
  }
};

