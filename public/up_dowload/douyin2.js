const axios = require("axios");

exports.name = '/douyin2';

exports.index = async (req, res, next) => {
    const link = req.query.link;
    if (!link) {
        return res.status(400).json({ error: "Thiếu tham số 'link'" });
    }

    try {
        const response = await axios.post(
            'https://snapvideo.io/wp-json/aio-dl/video-data/',
            new URLSearchParams({
                'url': link,
                'token': '2ad3dafa61a5f07faa482bea5e884a1c3bdfc91980e94a3d5814f62aad1d2e59',
                'hash': 'aHR0cHM6Ly92LmRvdXlpbi5jb20vaWZRbVdjMlgvL1030LYWlvLWRs'
            }),
            {
                headers: {
                    'accept': '*/*',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'origin': 'https://snapvideo.io',
                    'referer': 'https://snapvideo.io/tai-video-douyin-khong-logo/'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Lỗi request:", error.response?.data || error.message);
        res.status(500).json({ error: "Lỗi server", details: error.message });
    }
};
