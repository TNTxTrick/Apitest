const axios = require("axios");

exports.name = '/gsi/characters/search';
exports.index = async (req, res, next) => {
  const { vision, weapon } = req.query; // Extract vision and weapon from query parameters
  
  // Input validation: Ensure both vision and weapon parameters are provided
  if (!vision || !weapon) {
    return res.status(400).json({ error: 'Both vision and weapon parameters are required' });
  }

  try {
    const response = await axios.get(`https://gsi.fly.dev/characters/search?vision=${vision}&weapon=${weapon}`);
    
    // Handle response data appropriately
    res.json(response.data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error searching characters:', error);
    
    // Send a meaningful error message to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
