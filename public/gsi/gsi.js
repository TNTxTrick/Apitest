const axios = require('axios');

exports.name = '/gsi';
exports.index = async (req, res, next) => {
  try {
    const response = await axios.get(`https://gsi.fly.dev/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
