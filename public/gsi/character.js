const axios = require("axios");

exports.name = '/gsi/character/:id';
exports.index = async (req, res, next) => {
  const { id } = req.params; // Extract the id parameter
  try {
    // Input validation: Ensure id is a positive integer
    const characterId = parseInt(id);
    if (isNaN(characterId) || characterId <= 0) {
      return res.status(400).json({ error: 'Invalid character ID' });
    }
    
    const response = await axios.get(`https://gsi.fly.dev/characters/${characterId}`);
    
    // Handle response data appropriately
    res.json(response.data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching character data:', error);
    
    // Send a meaningful error message to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
