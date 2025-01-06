const axios = require('axios');
exports.name = '/capcut';
const extractLinks = (text) => {
  const regex = /(https:\/\/www.capcut.com\/t\/[a-zA-Z0-9_-]+)|(https:\/\/www.capcut.com\/template-detail\/[a-zA-Z0-9_-]+)/g;
  const matches = text.match(regex);
  return matches ? matches : [];
};

  exports.index = async (req, res, next) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.jsonp({ error: 'Thiếu Url vui lòng nhập Url để download' });
    }
    const extractedLinks = extractLinks(url);

    if (extractedLinks.length === 0) {
      return res.jsonp({ error: 'Link này không phải link mẫu capcut vui lòng thay bằng link mẫu capcut' });
    }

    for (const link of extractedLinks) {
      const getUrlResponse = await axios.get(`https://3bic.com/api/download/get-url?url=${link}`);
      const videoId = getUrlResponse.data.url.split("/")[4].split("?")[0];
      const options = {
        method: 'GET',
        url: `https://3bic.com/api/download/${videoId}`,
        headers: {
          'Connection': 'keep-alive',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'Cookie': 'sign=cde3417f57c29391af8c079891d42d74; device-time=1736159122859',
          'Referer': 'https://3bic.com/vi',
          'Host': '3bic.com',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept': 'application/json, text/plain, */*',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'cors'
        }
      };

      const response = await axios.request(options);
      const { title, description, usage, originalVideoUrl } = response.data;
      res.jsonp({
          title: title,
          description: description,
          usage: usage,
          video: `https://3bic.com${originalVideoUrl}`
      });
    }
  } catch (error) {
    res.jsonp({ error: 'Không tìm thấy mẫu' });
  }
  };
