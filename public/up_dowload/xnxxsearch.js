exports.name = '/xnxxsearch';
exports.index = async(req, res, next) => {
const keyword = req.query.keyword;
if (!keyword) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://all-media-downloader1.p.rapidapi.com/xnxx_search',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
    'X-RapidAPI-Host': 'all-media-downloader1.p.rapidapi.com'
  },
  data: {queryXNXX: keyword}
};

