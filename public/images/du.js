exports.name = '/images/du';
exports.index = async(req, res, next) => {
    try {
        const du = require('./data/json/du.json');
        var image = du[Math.floor(Math.random() * du.length)].trim();
        res.jsonp({
            url: image,
            count: du.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
