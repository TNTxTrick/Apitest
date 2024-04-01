exports.name = '/images/tw';
exports.index = async(req, res, next) => {
    try {
        const tw = require('./data/json/tw.json');
        var image = tw[Math.floor(Math.random() * tw.length)].trim();
        res.jsonp({
            url: image,
            count: tw.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
