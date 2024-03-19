const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://facebook-video-and-reel-downloader.p.rapidapi.com/',
  params: {
    url: 'https://www.facebook.com/share/v/LRDiKKduGnbM2TRt/?mibextid=xfxF2i'
  },
  headers: {
    'X-RapidAPI-Key': 'c677a2e9e3msh9944fd67c431ac3p1e4ca3jsn693a78eab94d',
    'X-RapidAPI-Host': 'facebook-video-and-reel-downloader.p.rapidapi.com'
  }
};

