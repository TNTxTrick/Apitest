const axios = require('axios');

exports.name = '/checkhost';
exports.index = async (req, res, next) => {
const link = req.query.link;
  if (!link) {
    return res.status(400).json({ error: 'Missing link query parameter' });
  }

  try {
    // First API call to initiate the check
    const initiateResponse = await axios.get('https://check-host.net/check-tcp', {
      params: {
        host: link,
        max_nodes: 10
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    const requestId = initiateResponse.data.request_id;
    if (!requestId) {
      return res.status(500).json({ error: 'Failed to retrieve request_id from the API' });
    }

    // Wait for a short period to allow the check to complete
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Second API call to get the results using the request_id
    const resultResponse = await axios.get(`https://check-host.net/check-result/${requestId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Send the result data back to the client
    res.json(resultResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
};
