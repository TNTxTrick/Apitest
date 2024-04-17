const axios = require('axios');

exports.name = '/downall';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' }); 

  const options = {
    method: 'POST',
    url: 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '5cb46a06bbmshcb43e68340c7c0ap12cfc8jsne9b4b7272ac0',
      'X-RapidAPI-Host': 'social-download-all-in-one.p.rapidapi.com'
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
    return res.json({ error: 'Có lỗi xảy ra khi tải tệp từ API' });
  }
};
