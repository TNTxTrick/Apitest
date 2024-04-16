
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://threads-photo-video-crawler.p.rapidapi.com/media',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': 'c132bcb70dmshfa148df92bdc1c6p1960dcjsn38097d82842c',
    'X-RapidAPI-Host': 'threads-photo-video-crawler.p.rapidapi.com'
  }
};

