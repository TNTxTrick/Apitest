const axios = require('axios');

exports.name = '/proxy';
exports.index = async (req, res, next) => {
  try {
    const response = await axios.get(`https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&proxy_format=ipport&format=text&timeout=9211`);
    
    // Handle response data appropriately
    res.json(response.data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching data:', error);
    
    // Send a meaningful error message to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
