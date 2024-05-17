exports.name = '/game/mts';
exports.index = async(req, res, next) => {
    const ress = require("./data/mts.json");
    const length1 = ress.mts.length
    const dataGame = ress.mts[Math.floor(Math.random() * length1)]
    res.json({ author: 'tnt', dataGame })
}
