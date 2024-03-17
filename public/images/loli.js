exports.name = '/images/loli';
exports.index = async(req, res, next) => {
    try {
        const loli = require('./data/json/loli.json');
        var image = loli[Math.floor(Math.random() * loli.length)].trim();
        res.jsonp({
            url: image,
            count: loli.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
