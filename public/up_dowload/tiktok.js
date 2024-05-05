
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tiktok-download-without-watermark.p.rapidapi.com/analysis',
  params: {
    url: link,
    hd: '0'
  },
  headers: {
    'X-RapidAPI-Key': 'b1b134d34cmsh9196ad10efa01eap12279cjsn01b3c727f546',
    'X-RapidAPI-Host': 'tiktok-download-without-watermark.p.rapidapi.com'
  }
};

