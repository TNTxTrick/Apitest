const axios = require('axios');

exports.name = '/bilibili';
exports.index = async (req, res, next) => {
  try {
    const resolveShortLink = async (shortUrl) => {
      try {
        const response = await axios.get(shortUrl, { maxRedirects: 0, validateStatus: (status) => status < 400 });
        return response.status === 302 ? response.headers.location : null;
      } catch (error) {
        console.error("Lỗi khi giải mã short link:", error.message);
        return null;
      }
    };

    const extractBVID = (url) => {
      const match = url.match(/BV[\w\d]+/);
      return match ? match[0] : null;
    };

    const getVideoInfo = async (bvid) => {
      const url = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
      try {
        const response = await axios.get(url, {
          headers: { "User-Agent": "Mozilla/5.0" }
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin video:", error.message);
        return null;
      }
    };

    const getPlayUrl = async (bvid, cid) => {
      const url = `https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=80&fnval=0`;
      try {
        const response = await axios.get(url, {
          headers: { "User-Agent": "Mozilla/5.0" }
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi khi lấy link phát trực tiếp:", error.message);
        return null;
      }
    };

    let { shortUrl } = req.query;

    if (!shortUrl) {
      return res.status(400).json({ error: "Thiếu tham số shortUrl." });
    }

    let bvid = extractBVID(shortUrl);
    if (!bvid) {
      const originalUrl = await resolveShortLink(shortUrl);
      if (!originalUrl) {
        return res.status(400).json({ error: "Không thể giải mã short link." });
      }
      bvid = extractBVID(originalUrl);
    }

    if (!bvid) {
      return res.status(400).json({ error: "Không thể trích xuất bvid từ link." });
    }

    const videoInfo = await getVideoInfo(bvid);
    if (!videoInfo || !videoInfo.data || !videoInfo.data.cid) {
      return res.status(400).json({ error: "Không thể lấy thông tin video." });
    }

    const cid = videoInfo.data.cid;
    const playUrlInfo = await getPlayUrl(bvid, cid);
    if (!playUrlInfo || !playUrlInfo.data || !playUrlInfo.data.durl || !playUrlInfo.data.durl[0]) {
      return res.status(400).json({ error: "Không thể lấy link phát trực tiếp." });
    }

    const videoUrl = playUrlInfo.data.durl[0].url;

    res.json({
      bvid,
      title: videoInfo.data.title,
      author: videoInfo.data.owner.name,
      videoUrl,
    });
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu:', error.message);
    res.status(500).json({ error: "Lỗi khi xử lý yêu cầu", details: error.message });
  }
};
