const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/lq/info';

exports.index = async (req, res, next) => {
  const tuong = req.query.tuong;

  if (!tuong) {
    return res.status(400).json({ error: 'Missing "tuong" query parameter' });
  }

  try {
    // Fetch the webpage
    const { data } = await axios.get(`https://lienquan.garena.vn/hoc-vien/tuong-skin/d/${tuong}`);

    // Load HTML data with Cheerio
    const $ = cheerio.load(data);

    // Extract hero's name
    const name = $('h3').text().trim();
    const cleanedName = name.split(' ')[0]; // Extract the first word of the name

    // Extract skin images
    const imageUrls = [];
    $('ul.hero__skins--list li a img').each((_, element) => {
      const src = $(element).attr('src');
      if (src) imageUrls.push(src);
    });

    // Extract skills
    const skills = [];
    $('ul.hero__skills--list li').each((index, element) => {
      const imgSrc = $(element).find('a img').attr('src');
      const skillTitle = $(element).find('a').attr('title');
      const skillDetail = $(`#heroSkill-${index + 1} article`).text().trim();

      skills.push({
        img: imgSrc || null,
        title: skillTitle || 'Unknown Skill',
        description: skillDetail || 'No description available',
      });
    });

    // Send the parsed data as JSON
    res.json({ name: cleanedName, img: imageUrls, skills });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
};
