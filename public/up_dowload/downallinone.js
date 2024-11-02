const axios = require('axios');

exports.name = '/downall';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' }); 

  const options = {
    method: 'POST',
    url: 'https://api.zm.io.vn/v1/social/autolink',
    headers: {
      'content-type': 'application/json',
      'apikey': '1YYDzX',
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
