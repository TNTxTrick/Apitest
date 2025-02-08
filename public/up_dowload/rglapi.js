
const axios = require('axios');

exports.name = '/rgl/api';
exports.index = async (req, res, next) => {
  const url = req.query.url; // Get the id from query parameters
  try {
    const response = await axios.get(`https://rgl-m8d7.onrender.com/api?originalUrl=${url}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
