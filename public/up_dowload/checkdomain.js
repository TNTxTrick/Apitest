const axios = require('axios');

exports.name = '/checkdomain/:domain';
exports.index = async (req, res, next) => {
const domain = req.params.domain;
    try {
        const response = await fetch(`https://whois.inet.vn/api/whois/domainspecify/${domain}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
