const axios = require('axios');
const { URLSearchParams } = require('url');

exports.name = '/screen';
exports.index = async (req, res, next) => {
  const captureScreenshot = async (url, device) => {
    const baseURL = 'https://www.screenshotmachine.com';
    const params = {
      url: url,
      device: device,
      cacheLimit: 0,
    };

    try {
      const initialResponse = await axios({
        url: `${baseURL}/capture.php`,
        method: 'POST',
        data: new URLSearchParams(params),
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      });

      const cookies = initialResponse.headers['set-cookie'];
      if (initialResponse.data.status === 'success') {
        const screenshotResponse = await axios.get(`${baseURL}/${initialResponse.data.link}`, {
          headers: {
            'cookie': cookies.join('; '),
          },
          responseType: 'arraybuffer',
        });

        return screenshotResponse.data;
      } else {
        throw new Error('Screenshot capture failed: Status not successful');
      }
    } catch (error) {
      console.error('Error in captureScreenshot:', error);
      throw new Error('Screenshot capture failed');
    }
  };

  try {
    const url = req.query.url;
    const device = req.query.device || 'desktop'; // Default to 'desktop' if not provided

    if (!url) {
      return res.status(400).send('URL is required');
    }

    try {
      const screenshotData = await captureScreenshot(url, device);
      res.setHeader('Content-Type', 'image/png');
      res.send(screenshotData);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      res.status(500).send('Failed to capture screenshot');
    }
  } catch (error) {
    console.error('Error in /screen route:', error);
    res.status(500).send('An error occurred');
  }
};

