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

exports.name = '/gsi/characters/search';
exports.index = async (req, res, next) => {
  const { vision, weapon } = req.query; // Extract vision and weapon from query parameters
  try {
    const response = await axios.get(`https://gsi.fly.dev/characters/search?vision=${vision}&weapon=${weapon}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.name = '/gsi/characters/:id/media';
exports.index = async (req, res, next) => {
  const { id } = req.params; // Extract the id parameter
  try {
    const response = await axios.get(`https://gsi.fly.dev/characters/${id}/media`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
