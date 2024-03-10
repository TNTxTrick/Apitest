const axios = require('axios');

exports.name = '/xnxxsearch';
exports.index = async (req, res, next) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    const options = {
        method: 'POST',
        url: 'https://all-media-downloader1.p.rapidapi.com/xnxx_search',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
            'X-RapidAPI-Host': 'all-media-downloader1.p.rapidapi.com'
        },
        data: { queryXNXX: keyword }
    };

    try {
        const response = await axios.request(options);
        if (response.status === 200) {
            return res.json(response.data);
        } else {
            return res.status(response.status).json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ API' });
        }
    } catch (error) {
        console.error(error);
        if (error.response) {
            
            return res.status(error.response.status).json({ error: 'Có lỗi xảy ra khi tải xuống dữ liệu từ API' });
        } else if (error.request) {
            
            return res.status(500).json({ error: 'Có lỗi xảy ra khi gửi yêu cầu đến server' });
        } else {
          
            return res.status(500).json({ error: 'Có lỗi xảy ra trong quá trình xử lý yêu cầu' });
        }
    }
};
