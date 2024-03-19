
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://download-snapchat-video-spotlight-online.p.rapidapi.com/download',
  params: {
    url: 'https://t.snapchat.com/xnS0NlBb '
  },
  headers: {
    'X-RapidAPI-Key': 'c677a2e9e3msh9944fd67c431ac3p1e4ca3jsn693a78eab94d',
    'X-RapidAPI-Host': 'download-snapchat-video-spotlight-online.p.rapidapi.com'
  }
};

