const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/onepiece/character/:name';
exports.index = async (req, res, next) => {
const name = req.params.name;
      const url = `https://onepiece.fandom.com/vi/wiki/${name}`;

      try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        const characterName = $('h2.pi-item.pi-item-spacing.pi-title.pi-secondary-background').text().trim();
        const name_ja = $('div.pi-data-value.pi-font').eq(0).text().trim();
        const phonetic_name = $('div.pi-data-value.pi-font').eq(1).text().trim();
        const appear = $('div.pi-data-value.pi-font').eq(3).text().trim();
        const faction = $('div.pi-data-value.pi-font').eq(4).text().trim();
        const position = $('div.pi-data-value.pi-font').eq(5).text().trim();
        const accommodation = $('div.pi-data-value.pi-font').eq(6).text().trim();
        const age = $('div.pi-data-value.pi-font').eq(7).text().trim();
        const nickname = $('div.pi-data-value.pi-font').eq(8).text().trim();
        const names = $('div.pi-data-value.pi-font').eq(9).text().trim();
        const current_status = $('div.pi-data-value.pi-font').eq(10).text().trim();
        const birthday = $('div.pi-data-value.pi-font').eq(11).text().trim();
        const blood_group = $('div.pi-data-value.pi-font').eq(12).text().trim();
        const height = $('div.pi-data-value.pi-font').eq(13).text().trim();
        const fruit = $('div.pi-data-value.pi-font').eq(17).text().trim();
        const generation = $('div.pi-data-value.pi-font').eq(19).text().trim();
        const spanElement = $('span:has(img[alt="Bsymbol"])');

        // Extract the number after the <span> element
        const wanted_money = spanElement[0].nextSibling.nodeValue.trim();
        const img = $('img').attr('src');

        res.json({
          name: characterName,
          name_ja: name_ja,
          phonetic_name: phonetic_name,
          appear: appear,
          faction: faction,
          img: img,
          position: position,
          accommodation: accommodation,
          age: age,
          nickname: nickname,
          names: names,
          current_status: current_status,
          birthday: birthday,
          blood_group: blood_group,
          height: height,
          wanted_money: wanted_money,
          fruit: fruit,
          generation: generation
        });

      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    };
