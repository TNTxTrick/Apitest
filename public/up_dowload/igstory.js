
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://instagram-post-reels-stories-downloader.p.rapidapi.com/instagram/',
  params: {
    url: 'https://www.instagram.com/stories/minhthu04._/3335117007806563854?igsh=cWo0c2xscmV3b21l'
  },
  headers: {
    'X-RapidAPI-Key': '3630a660f7msh5928760034ca557p1a6373jsnf2ebaa2cc40e',
    'X-RapidAPI-Host': 'instagram-post-reels-stories-downloader.p.rapidapi.com'
  }
};

