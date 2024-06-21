const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/tensor/info';
exports.index = async (req, res, next) => {
const id = req.query.id;
    if (!id) {
      return res.status(400).send('User ID is required');
    }

    const link = `https://api.tensor.art/user-web/v1/user/profiles/detail?userId=${id}`;

    try {
      const response = await axios.get(link);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send('Error fetching user profile');
    }
  };
