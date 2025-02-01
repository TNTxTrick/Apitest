const axios = require('axios');

exports.name = '/infogenshin';
exports.index = async (req, res, next) => {
  const id = req.query.id; // Get the id from query parameters
  try {
    const response = await axios.get(`https://genshin.dakgg.io/roles/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
