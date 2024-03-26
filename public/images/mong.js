exports.name = '/images/mong';
exports.index = async(req, res, next) => {
    try {
        const mong = require('./data/json/mong.json');
        var image = mong[Math.floor(Math.random() * mong.length)].trim();
        res.jsonp({
            url: image,
            count: mong.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
          }
