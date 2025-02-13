const axios = require('axios');

exports.name = '/hoyolab';
exports.index = async (req, res, next) => {
    let { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Missing link parameter' });
    }

    try {
        // Nếu URL là hoyo.link, lấy URL đầy đủ bằng request HEAD
        if (url.includes('hoyo.link')) {
            try {
                const response = await axios.get(url, { maxRedirects: 0 }).catch(err => err.response);
                if (response && response.headers && response.headers.location) {
                    url = response.headers.location; // Lấy URL đầy đủ từ redirect
                } else {
                    return res.status(400).json({ error: 'Failed to resolve hoyo.link' });
                }
            } catch (error) {
                return res.status(500).json({ error: 'Error resolving hoyo.link', details: error.message });
            }
        }

        // Loại bỏ tham số truy vấn
        let cleanUrl = url.split('?')[0];

        // Cập nhật regex để lấy postId chính xác hơn
        const postIdMatch = cleanUrl.match(/(?:article\/|post\/)(\d+)/);

        if (!postIdMatch) {
            return res.status(400).json({ error: 'Invalid URL format', url_received: url });
        }

        const postId = postIdMatch[1];

        // Gọi API Hoyolab
        const response = await axios.get('https://bbs-api-os.hoyolab.com/community/post/wapi/getPostFull', {
            params: { post_id: postId, scene: '1' },
            headers: {
                'accept': 'application/json, text/plain, */*',
                'origin': 'https://m.hoyolab.com',
                'referer': 'https://m.hoyolab.com/',
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
                'x-rpc-app_version': '3.6.0',
                'x-rpc-client_type': '5',
                'x-rpc-language': 'vi-vn',
                'x-rpc-show-translated': 'true',
                'x-rpc-target_lang': 'vi-vn'
            }
        });

        const postData = response.data?.data?.post?.post;
        const postStats = response.data?.data?.post?.stat;

        if (!postData || !postStats) {
            return res.status(404).json({ error: 'Post not found' });
        }

        let content;
        try {
            content = JSON.parse(postData.content);
        } catch (e) {
            content = { imgs: [], describe: "" }; // Giá trị mặc định nếu lỗi
        }

        res.json({
            original_url: req.query.url,
            resolved_url: url, // URL sau khi xử lý
            subject: postData.subject,
            post_id: postData.post_id,
            uid: postData.uid,
            title: content.describe,
            view_num: postStats.view_num,
            reply_num: postStats.reply_num,
            like_num: postStats.like_num,
            bookmark_num: postStats.bookmark_num,
            share_num: postStats.share_num,
            imageUrls: content.imgs
        });

    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data', details: error.message });
    }
};
