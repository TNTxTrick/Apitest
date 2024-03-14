exports.name = '/images/vdgai';
exports.index = async(req, res, next) => {
    try {
        const vdgai = require('./data/json/vdgai.json');
        var image = vdgai[Math.floor(Math.random() * vdgai.length)].trim();
        res.jsonp({
            url: image,
            count: vdgai.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
