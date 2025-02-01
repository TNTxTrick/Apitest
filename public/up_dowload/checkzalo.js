
const axios = require('axios');

exports.name = '/checkzalo';
exports.index = async (req, res, next) => {
  const sdt = req.query.sdt; 
  try {
    const response = await axios.get(`https://api.zm.io.vn/v1/social/zalo/check_phone?phone=${sdt}&apikey=xJMWD7svkI`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
