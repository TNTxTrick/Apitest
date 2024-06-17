const axios = require("axios");

exports.name = '/tiki/search';

exports.index = async (req, res, next) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).send('Missing query parameter q.');
  }

  try {
    const response = await axios.get(`https://tiki.vn/api/v2/products?limit=10&include=advertisement&aggregations=2&trackity_id=97cf2469-159b-a127-30b9-cc511c79ffd4&q=${q}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error occurred while fetching data from Tiki API:', error);
    res.status(500).send('Error occurred while fetching data from Tiki API.');
  }
};

