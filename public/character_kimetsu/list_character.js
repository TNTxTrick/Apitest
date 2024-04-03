exports.name = '/list_character';
const axios = require('axios');
const cheerio = require('cheerio');

exports.index = async (req, res, next) => {
    axios.get('https://kimetsu-no-yaiba.fandom.com/wiki/Kimetsu_no_Yaiba_Wiki')
        .then(({ data }) => {
            const thumbnails = [];
            const limit = Number(req.query.limit);
            const $ = cheerio.load(data);
            $(".portal").each((index, element) => {
                const name = $(element).find("a").attr("title");
                const url = $(element).find("a").attr("href");
                const image = $(element).find("a > img").attr("data-src");
                const cleanUrl = "https://kimetsu-no-yaiba.fandom.com" + url.substring(url.indexOf("/wiki"));
                thumbnails.push({ name, url: cleanUrl, image });
            });
            if (limit && limit > 0) {
                res.jsonp(thumbnails.slice(0, limit));
            } else {
                res.jsonp(thumbnails);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            res.status(500).send("An error occurred while fetching data.");
        });
};
