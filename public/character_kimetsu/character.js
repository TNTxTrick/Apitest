exports.name = '/info/:character';
const axios = require('axios');
const cheerio = require('cheerio');

exports.index = async (req, res, next) => {
    const characterUrl = 'https://kimetsu-no-yaiba.fandom.com/wiki/';
    const url = characterUrl + req.params.character;
    const titles = [];
    const details = [];
    const galleries = [];
    const characters = [];
    const characterObj = {};

    axios.get(url)
        .then(({ data }) => {
            const $ = cheerio.load(data);

            $(".wikia-gallery-item").each(function(){
                const gallery = $(this).find("a > img").attr("data-src");
                galleries.push(gallery);
            });

            $("aside").each(function () {
                const image = $(this).find("img").attr("src");

                $(this).find("section > div > h3").each(function () {
                    titles.push($(this).text());
                });

                $(this).find("section > div > div").each(function () {
                    details.push($(this).text());
                });

                if (image !== undefined) {
                    for (let i = 0; i < titles.length; i++) {
                        characterObj[titles[i].toLowerCase()] = details[i];
                    }

                    characters.push({
                        name: req.params.character.replace("_"," "),
                        gallery: galleries,
                        image: image,
                        ...characterObj,
                    });
                }
            });
            res.json(characters);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            res.status(500).send("An error occurred while fetching data.");
        });
};
