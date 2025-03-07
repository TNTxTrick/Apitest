const axios = require("axios");

exports.name = "/bilibili";
exports.index = async (req, res, next) => {
  try {
    // 🛠 Trích xuất bvid từ URL
    function extractBvid(url) {
      const match = url.match(/\/video\/(BV[a-zA-Z0-9]+)/);
      return match ? match[1] : null;
    }

    // 🛠 Lấy thông tin video
    async function getVideoInfo(bvid) {
      const url = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
      const response = await axios.get(url);
      if (response.data.code !== 0) throw new Error("Không thể lấy thông tin video.");
      return response.data.data;
    }

    // 🛠 Lấy danh sách chất lượng video
    async function getVideoUrl(bvid, cid, quality = 80) {
      const url = `https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=${quality}&otype=json&fourk=1`;
      const headers = {
        "Referer": "https://www.bilibili.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      };

      const response = await axios.get(url, { headers });
      if (response.data.code !== 0) throw new Error("Không thể lấy link video.");

      const videoData = response.data.data;
      return {
        quality: videoData.quality,
        available_qualities: videoData.accept_quality,
        url: videoData.durl?.[0]?.url || null,
      };
    }

    // 🚀 API lấy thông tin và link tải video từ URL
    const { url, qn } = req.query;
    if (!url) return res.status(400).json({ error: "Thiếu tham số URL" });

    // 1️⃣ Trích xuất bvid từ URL
    const bvid = extractBvid(url);
    if (!bvid) return res.status(400).json({ error: "URL không hợp lệ hoặc không tìm thấy bvid" });

    // 2️⃣ Lấy thông tin video
    const videoInfo = await getVideoInfo(bvid);
    if (!videoInfo) return res.status(404).json({ error: "Không tìm thấy video" });

    // 3️⃣ Lấy link video MP4 (cho phép chọn chất lượng)
    const quality = qn ? parseInt(qn) : 80;
    const videoData = await getVideoUrl(bvid, videoInfo.cid, quality);
    if (!videoData.url) return res.status(404).json({ error: "Không tìm thấy link video" });

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
      available_qualities: videoData.available_qualities,
      video_quality: videoData.quality,
      videoUrl: videoData.url,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Lỗi khi xử lý yêu cầu", details: error.message });
  }
};
