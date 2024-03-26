exports.name = '/images/nude';
exports.index = async(req, res, next) => {
    try {
        const nude = require('./data/json/nude.json');
        var image = nude[Math.floor(Math.random() * nude.length)].trim();
        res.jsonp({
            url: image,
            count: nude.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
