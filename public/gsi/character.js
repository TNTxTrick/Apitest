const axios = require("axios");

exports.name = '/gsi/character/:id';
exports.index = async (req, res, next) => {
  const { id } = req.params; // Extract the id parameter
  try {
    const response = await axios.get(`https://gsi.fly.dev/characters/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
