
const axios = require('axios');

exports.name = '/infoff';
exports.index = async (req, res, next) => {
  const id = req.query.id; // Get the id from query parameters
  try {
    const response = await axios.get(`https://www.public.freefireinfo.site/api/info/vn/${id}?key=tnt_ff`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
