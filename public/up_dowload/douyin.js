const axios = require('axios');

exports.name = '/douyin';
exports.index = async (req, res, next) => {
  const link = req.query.link; 
  try {
    const response = await axios.get('https://godownloader.com/api/tiktok-no-watermark-free?key=godownloader.com&url=' + link);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
