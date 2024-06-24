const axios = require('axios');

exports.name = '/gemini';
exports.index = async (req, res, next) => {
  const q = req.query.q;
  const apiKey = 'AIzaSyB-r3YSknuYbyyjmXK8dKJDu2xojBzi5wo';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: q
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the response status is not successful (not 200-299)
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to generate content: ${response.status} ${response.statusText}`);
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error generating content:', error.message);
    // Customize error handling based on different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside of the range of 2xx
      res.status(error.response.status).json({
        error: `API Error: ${error.response.data.error.message}`
      });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ error: 'No response received from server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ error: 'An error occurred while generating content' });
    }
  }
};
