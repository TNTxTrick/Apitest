
const axios = require('axios');

exports.name = '/rgl/check';
exports.index = async (req, res, next) => {
  const id = req.query.id; 
  try {
    const response = await axios.get(`https://rgl-m8d7.onrender.com/check?id=${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
