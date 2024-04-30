const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/lq/info/:id';

exports.index = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`https://lienquan.garena.vn/tuong-chi-tiet/${id}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const hero = $('section.heroes-page div.inner-page div.skin-hero h2').text().trim();

    const skinImages = $('div.tabs-content-skin img[src]');
    const cont = $('div.col p span[data-original]');
    const skills = $('div.in-skill h2');

    const skinUrls = skinImages.map((index, element) => $(element).attr('src')).get();
    const conts = cont.map((index, element) => $(element).attr('data-original')).get();
    const skillNames = skills.map((index, element) => $(element).text().trim()).get();

    const contObjects = conts.map((value, index) => ({ [index + 1]: value }));
    const skillObjects = skillNames.map((value, index) => ({ [index + 1]: value }));

    const completeSkinUrls = skinUrls.map(url => `https://lienquan.garena.vn${url}`);

    console.log('Hero:', hero);
    console.log('Skin URLs:', completeSkinUrls);
    console.log('Cont:', contObjects);
    console.log('Skills:', skillObjects);

    const responseData = {
      hero: hero,
      skin: completeSkinUrls,
      cont: contObjects,
      skills: skillObjects
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching data');
  }
};


