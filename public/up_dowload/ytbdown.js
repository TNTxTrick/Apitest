
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://youtube-audio-video-download.p.rapidapi.com/geturl',
  params: {
    video_url: link
  },
  headers: {
    'X-RapidAPI-Key': 'c677a2e9e3msh9944fd67c431ac3p1e4ca3jsn693a78eab94d',
    'X-RapidAPI-Host': 'youtube-audio-video-download.p.rapidapi.com'
  }
};


