exports.name = '/images/cosplay';
exports.index = async(req, res, next) => {
    try {
        const cosplay = require('./data/json/cosplay.json');
        var image = cosplay[Math.floor(Math.random() * cosplay.length)].trim();
        res.jsonp({
            url: image,
            count: cosplay.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
