const axios = require('axios');

exports.name = '/gsi';
exports.index = async (req, res, next) => {
  try {
    const response = await axios.get(`https://gsi.fly.dev/`);
    
    // Handle response data appropriately
    res.json(response.data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching data:', error);
    
    // Send a meaningful error message to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
