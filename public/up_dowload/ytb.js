const axios = require('axios');

exports.name = '/ytb';
exports.index = async (req, res, next) => {
  const link = req.query.link; 
  try {
const response = await axios.post(
      'https://iloveyt.net/proxy.php',
      new URLSearchParams({
        'url': link
      }),
      {
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'cookie': 'PHPSESSID=mjt87o3td4uj7jvnhl76l76cap',
          'origin': 'https://iloveyt.net',
          'priority': 'u=1, i',
          'referer': 'https://iloveyt.net/en2',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'x-requested-with': 'XMLHttpRequest'
        }
      }
    );
res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
