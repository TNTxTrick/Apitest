exports.name = '/tiktok';
exports.index = async(req, res, next) => {
const link = req.query.link;
if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tiktok-download-video1.p.rapidapi.com/getVideo',
  params: {
    url: link,
    hd: '1'
  },
  headers: {
    'X-RapidAPI-Key': 'b1b134d34cmsh9196ad10efa01eap12279cjsn01b3c727f546',
    'X-RapidAPI-Host': 'tiktok-download-video1.p.rapidapi.com'
  }
};

try {
      const response = await axios.request(options);
      console.log(response.data);
      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.json({ error: 'Có lỗi xảy ra khi tải từ API' });
    }
  };
