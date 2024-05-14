exports.name = '/doutube/info';
exports.index = async (req, res, next) => {
    var id = req.query.id;
    if (!id) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });

    try {
        var axios = require('axios');
        var url = `https://api.doutu.be/api/video/?author=${id}&skips=0&limit=1`;
        console.log(`Requesting URL: ${url}`);
        var response = await axios.post(url, { url: id });
        var data = response.data;
        console.log(data);
        return res.json(data);
    } catch (error) {
        console.error(`Error making request: ${error.message}`);
        if (error.response) {
            console.error(`Response data: ${JSON.stringify(error.response.data)}`);
            console.error(`Response status: ${error.response.status}`);
            console.error(`Response headers: ${JSON.stringify(error.response.headers)}`);
        }
        return res.json({ error: error.message });
    }
};
