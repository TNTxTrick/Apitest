const axios = require('axios');

exports.name = '/douyin';
exports.index = async (req, res, next) => {
  const link = req.query.link;

  if (!link) {
    return res.status(400).json({ error: 'Link parameter is required' });
  }

  try {
    const response = await axios.get(`https://godownloader.com/api/tiktok-no-watermark-free?key=godownloader.com&url=${encodeURIComponent(link)}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from the API', details: error.message });
  }
};
