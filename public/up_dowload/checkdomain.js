const axios = require('axios');

exports.name = '/checkdomain';
exports.index = async (req, res, next) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json('Vui lòng nhập Domain')
  }
  try {
    const response = await axios.get(`https://whois.inet.vn/api/whois/domainspecify/${url}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Something went wrong!');
  }
};
