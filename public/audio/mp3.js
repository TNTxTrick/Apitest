exports.name = '/mp3';
exports.index = async(req, res, next) => {
    try {
        const mp3 = require('./data/audio.json');
        var audio = mp3[Math.floor(Math.random() * mp3.length)].trim();
        res.jsonp({
            url: audio,
            count: mp3.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
