
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://facebook-video-audio-download.p.rapidapi.com/geturl',
  params: {
    video_url: 'https://www.facebook.com/reel/523477522932448'
  },
  headers: {
    'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
    'X-RapidAPI-Host': 'facebook-video-audio-download.p.rapidapi.com'
  }
};

try {
      const response = await axios.request(options);
      console.log(response.data);
      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ Youtube' });
    }
  };
