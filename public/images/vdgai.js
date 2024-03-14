exports.name = '/images/vdgai';
exports.index = async(req, res, next) => {
    try {
        const gai = require('./data/json/gai.json');
        var image = gai[Math.floor(Math.random() * gai.length)].trim();
        res.jsonp({
            url: image,
            count: gai.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
