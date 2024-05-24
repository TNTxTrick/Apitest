exports.name = '/audio/mp3';
exports.index = async(req, res, next) => {
    try {
        const mp3 = require('./data/json/mp3.json');
        var image = mp3[Math.floor(Math.random() * mp3.length)].trim();
        res.jsonp({
            url: image,
            count: mp3.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
