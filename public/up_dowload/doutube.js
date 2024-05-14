exports.name = '/doutube';
exports.index = async(req, res, next) => {
var link = req.query.link;
if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
var axios = require('axios');
axios({
    method: 'post',
    url: 'https://api.doutu.be/api/video/feed_recent/?&skips=0&limit=' + link,
    data: {    
	url: link
	}
})
.then(function (response) {
    var data = response.data
    console.log(data)
    return res.json(data)
})
.catch(function (error) {
    return res.json({ error });
});
}
