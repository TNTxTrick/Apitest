exports.name = '/doutube/info';
exports.index = async (req, res, next) => {
    var id = req.query.id;
    if (!id) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });

    try {
        var axios = require('axios');
        var response = await axios.post(`https://api.doutu.be/api/video/?author=${id}&skips=0&limit=1`, { url: id });
        var data = response.data;
        console.log(data);
        return res.json(data);
    } catch (error) {
        return res.json({ error: error.message });
    }
};
