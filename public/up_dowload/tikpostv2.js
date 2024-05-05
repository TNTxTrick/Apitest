const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tiktok-download-video1.p.rapidapi.com/getVideo',
  params: {
    url: 'https://www.tiktok.com/@tiktok/video/7106658991907802411',
    hd: '1'
  },
  headers: {
    'X-RapidAPI-Key': 'b1b134d34cmsh9196ad10efa01eap12279cjsn01b3c727f546',
    'X-RapidAPI-Host': 'tiktok-download-video1.p.rapidapi.com'
  }
};

