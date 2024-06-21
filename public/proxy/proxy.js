const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/proxy';
exports.index = async (req, res, next) => {
try {
    const response = await axios.get('https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&proxy_format=ipport&format=text&timeout=20000');
    const data = response.data;

    res.set('Content-Type', 'text/plain');
    res.send(data);
  } catch (error) {
    console.error('Error fetching proxy data:', error);
    res.status(500).send('An error occurred while fetching proxy data');
  }
};
