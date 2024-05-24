exports.name = '/audio';
exports.index = async(req, res, next) => {
    try {
        const audio = require('./data/audio.json');
        var audio = audio[Math.floor(Math.random() * audio.length)].trim();
        res.jsonp({
            url: audio,
            count: audio.length,
            author: 'Tnt'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
