const axios = require('axios');

exports.name = '/urlscan';
exports.index = async (req, res, next) => {
const domain = req.query.domain;
    if (!domain) {
        return res.status(400).json({ error: 'Domain query parameter is required' });
    }

    try {
        const response = await axios.get(`https://urlscan.io/api/v1/search/?q=domain:${domain}`);
        res.json(response.data);  // Return only the res.data from the API call
    } catch (error) {
        console.error('Error fetching data from urlscan.io:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
