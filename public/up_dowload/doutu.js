// doutu.js
const axios = require('axios');

exports.name = '/doutu';
exports.index = async (req, res, next) => {
  const id = req.query.id; // Get the id from query parameters
  try {
    const response = await axios.get(`https://api.doutu.be/api/video/?author=${id}&skips=0&limit=1`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
