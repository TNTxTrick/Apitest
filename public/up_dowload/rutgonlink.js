const axios = require('axios');

exports.name = '/rutgonlink';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' }); 

  try {
    // Tạo một đối tượng FormData và thêm URL cần rút gọn
    const data = new FormData();
    data.append('url', link);

    const options = {
      method: 'POST',
      url: 'https://url-shortener-service.p.rapidapi.com/shorten',
      headers: {
        'x-rapidapi-key': '15375c47d5msh3698cbdb105ac9bp167948jsn5ac92ee40cca',
        'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com',
        ...data.getHeaders(),
      },
      data: data
    };
