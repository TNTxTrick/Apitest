const axios = require('axios');

exports.name = '/download/track';
exports.index = async (req, res, next) => {
  const link = req.query.link;
  try {
    const response = await axios({
      url: `https://spotifyapi.caliphdev.com/api/download/track?url=${link}`,
      method: 'GET',
      responseType: 'stream'  // Ensure response is in stream format
    });

    res.setHeader('Content-Type', 'audio/mpeg');

    response.data.pipe(res);  // Pipe the stream directly to the response

  } catch (error) {
    res.status(500).send(error.toString());
  }
};
