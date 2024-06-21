const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/tensor/infopost';
exports.index = async (req, res, next) => {
const link = req.query.link;
  if (!link) {
    return res.status(400).send('Link is required');
  }

  const regex = /https:\/\/tensor\.art\/images\/(\d+)\?post_id=(\d+)/;
  const match = link.match(regex);
  if (!match) {
    return res.status(400).send('Invalid link format');
  }

  const id = match[1];
  const id2 = match[2];
  const url = `https://api.tensor.art/community-web/v1/image/detail?id=${id}&postId=${id2}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    res.json({data})
    } catch (error) {
        console.error('Error fetching data from the API:', error);
        res.status(500).send('Error fetching data from the API');
      }
    };
