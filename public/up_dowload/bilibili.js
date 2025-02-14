const axios = require('axios');

exports.name = '/bilibili';
exports.index = async (req, res, next) => {
  try {
    // 🛠 Hàm trích xuất bvid từ URL
    function extractBvid(url) {
      const match = url.match(/\/video\/(BV[a-zA-Z0-9]+)/);
      return match ? match[1] : null;
    }

    // 🛠 Hàm lấy thông tin video
    async function getVideoInfo(bvid) {
      const url = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
      const response = await axios.get(url);
      return response.data?.data || null;
    }

    // 🛠 Hàm lấy link tải video
    async function getVideoUrl(bvid, cid) {
      const url = `https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=80&type=&otype=json&fourk=1`;
      const headers = {
        "Referer": "https://www.bilibili.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      };

      const response = await axios.get(url, { headers });
      return response.data?.data?.durl?.[0]?.url || null;
    }

    // 🚀 API lấy thông tin và link tải video từ URL
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Thiếu tham số URL" });

    // 1️⃣ Trích xuất bvid từ URL
    const bvid = extractBvid(url);
    if (!bvid) return res.status(400).json({ error: "URL không hợp lệ hoặc không tìm thấy bvid" });

    // 2️⃣ Lấy thông tin video
    const videoInfo = await getVideoInfo(bvid);
    if (!videoInfo) return res.status(404).json({ error: "Không tìm thấy video" });

    // 3️⃣ Lấy link video MP4
    const videoUrl = await getVideoUrl(bvid, videoInfo.cid);
    if (!videoUrl) return res.status(404).json({ error: "Không tìm thấy link video" });

    // 4️⃣ Trả về JSON với đầy đủ thông tin video
    return res.json({
      title: videoInfo.title,
      description: videoInfo.desc,
      thumbnail: videoInfo.pic,
      uploader: videoInfo.owner.name,
      uploader_avatar: videoInfo.owner.face,
      views: videoInfo.stat.view,
      likes: videoInfo.stat.like,
      comments: videoInfo.stat.reply,
      favorites: videoInfo.stat.favorite,
      shares: videoInfo.stat.share,
      upload_date: new Date(videoInfo.pubdate * 1000).toISOString(),
      duration: videoInfo.duration,
      videoUrl: videoUrl,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: "Lỗi khi xử lý yêu cầu", details: error.message });
  }
};
