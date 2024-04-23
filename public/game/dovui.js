const fs = require('fs');

exports.name = '/game/dovuilq';
exports.index = async (req, res, next) => {
    try {
        const resp = JSON.parse(fs.readFileSync("./data/dovui.json"));
        const length = resp.length;
        const randomIndex = Math.floor(Math.random() * length);
        const randomQuestion = resp[randomIndex];
        
        res.setHeader('Content-Type', 'application/json');
        return res.json({ 
            author: 'tnt',
            data: randomQuestion
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
