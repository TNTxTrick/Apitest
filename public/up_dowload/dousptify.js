const axios = require('axios');

exports.name = '/download/track';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  try {
    const response = await axios.get(`https://spotifyapi.caliphdev.com/api/download/track?url=${link}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
