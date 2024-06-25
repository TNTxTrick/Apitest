const axios = require('axios');

exports.name = '/image_anime';
exports.index = async (req, res, next) => {
try {
    const response = await axios.get('https://pic.re/image', {
      responseType: 'arraybuffer',
    });
    const imageBuffer = Buffer.from(response.data, 'binary');
    res.set('Content-Type', response.headers['content-type']);
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
};
