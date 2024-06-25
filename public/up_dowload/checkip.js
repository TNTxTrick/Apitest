const axios = require('axios');

exports.name = '/checkip';
exports.index = async (req, res, next) => {
  const ip = req.query.ip;
  if (!ip) {
    return res.status(400).json('Vui lòng nhập IP')
  }
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Something went wrong!');
  }
};
