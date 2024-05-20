const axios = require('axios');

exports.name = '/search/tracks';
exports.index = async (req, res, next) => {
  const q = req.query.q; 
  try {
    const response = await axios.get(`https://spotifyapi.caliphdev.com/api/search/tracks?q=${q}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
