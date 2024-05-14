exports.name = '/doutube/info';
exports.index = async(req, res, next) => {
var id = req.query.id;
if (!id) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
var axios = require('axios');
axios({
    method: 'post',
    url: 'https://api.doutu.be/api/video/?author=' + id + '&skips=0&limit=1',
    data: {    
	url: id
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
