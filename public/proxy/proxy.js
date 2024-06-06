const axios = require('axios');

exports.name = '/proxy';
exports.index = async (req, res) => {
  try {
    const response = await axios.get('https://api.proxyscrape.com/v3/free-proxy-list/get', {
      params: {
        request: 'displayproxies',
        proxy_format: 'ipport',
        format: 'text',
        timeout: 9211
      }
    });

    // Trả về dữ liệu API mà không chỉnh sửa
    res.send(response.data);
  } catch (error) {
    // Log lỗi để debug
    console.error('Error fetching data:', error.message);

    // Trả về thông báo lỗi cho client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
