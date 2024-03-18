exports.name = '/link/linkytb';
exports.index = async(req, res, next) => {
    try {
        const linkytb = require('./data/json/link.json');
        var image = linkytb[Math.floor(Math.random() * linkytb.length)].trim();
        res.jsonp({
            url: image,
            count: linkytb.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
