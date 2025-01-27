const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/lq/info/:tuong';

exports.index = async (req, res, next) => {
  
  try {
    
    const { data } = await axios.get(`https://lienquan.garena.vn/hoc-vien/tuong-skin/d/${tuong}`);

    
    const $ = cheerio.load(data);

   
    const name = $('h3').text().trim();

    
    const cleanedName = name.split(' ')[0];  

    
    const imageUrls = [];

    $('ul.hero__skins--list li a img').each((index, element) => {
      const src = $(element).attr('src'); 
      if (src) {
        imageUrls.push(src); 
      }
    });

    const skills = [];

    
    $('ul.hero__skills--list li').each((index, element) => {
      
      const imgSrc = $(element).find('a img').attr('src');

      const skillTitle = $(element).find('a').attr('title');

      const skillDetail = $(`#heroSkill-${index + 1} article`).text().trim();

      skills.push({
        img: imgSrc,
        title: skillTitle,
        description: skillDetail,
      });
    });

    res.json({ name: cleanedName, img: imageUrls, skills });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching data');
  }
};


