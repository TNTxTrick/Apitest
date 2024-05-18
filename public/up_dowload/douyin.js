const axios = require('axios');

exports.name = '/douyin';
exports.index = async (req, res, next) => {
  const link = req.query.link;

  if (!link) {
    return res.status(400).json({ error: 'Link parameter is required' });
  }

  try {
    const apiUrl = `https://godownloader.com/api/tiktok-no-watermark-free?key=godownloader.com&url=${encodeURIComponent(link)}`;
    console.log(`Requesting URL: ${apiUrl}`);
    const response = await axios.get(apiUrl);
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response headers: ${JSON.stringify(error.response.headers)}`);
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    return res.status(500).json({ 
      error: 'Failed to fetch data from the API',
      details: error.message,
      status: error.response ? error.response.status : 'unknown'
    });
  }
};
