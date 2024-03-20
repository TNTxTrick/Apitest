
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tiktok-video-feature-summary.p.rapidapi.com/music/info',
  params: {
    url: link
  },
  headers: {
    'X-RapidAPI-Key': 'd0ab76bc06msh5032ca2f6f3baf9p15f9d8jsn024d834a55cb',
    'X-RapidAPI-Host': 'tiktok-video-feature-summary.p.rapidapi.com'
  }
};

