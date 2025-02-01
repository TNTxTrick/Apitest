const axios = require("axios");
const cheerio = require("cheerio");

exports.name = '/instagram';

exports.index = async (req, res, next) => {
    const link = req.query.link;
try {

    // Make the POST request using axios
    const response = await axios.post(
      'https://snapvideo.io/wp-json/aio-dl/video-data/',
      new URLSearchParams({
        'url': link,
        'token': '2ad3dafa61a5f07faa482bea5e884a1c3bdfc91980e94a3d5814f62aad1d2e59',
        'hash': 'aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9pbnN0YWdyYW0vcmVlbC9ERk56a290dkQ3Ti8=L1053LYWlvLWRs'
      }),
      {
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'cookie': 'PHPSESSID=9fj0t26c34c01mn6knjl7i8nqf; pll_language=vi; _ga_93DGJ7EPCL=GS1.1.1737967731.1.0.1737967731.0.0.0; _ga=GA1.1.2008311444.1737967731; pvc_visits[0]=1738054125b172; prefetchAd_8481177=true',
          'origin': 'https://snapvideo.io',
          'priority': 'u=1, i',
          'referer': 'https://snapvideo.io/tai-video-douyin-khong-logo/',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
      }
    );
    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Lỗi');
  }
};
