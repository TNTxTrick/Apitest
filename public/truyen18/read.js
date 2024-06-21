const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/truyen18/read';
exports.index = async (req, res, next) => {
  const link = req.query.link; 
    if (!link || !link.startsWith('https://damconuong.net/')) {
      return res.status(400).json({ error: 'Invalid or missing link parameter' });
    }

      try {
        
        const { data } = await axios.get(link);
        const $ = cheerio.load(data);

        const chap = $('div.max-w-7xl.mx-auto.px-3.w-full.mt-6 span').eq(4).text().trim();

        const images = [];
        $('img').each((index, element) => {
          let imageUrl = $(element).attr('src');
          if (imageUrl) {
            imageUrl = imageUrl.trim();
            if (imageUrl.match(/^https:\/\/i[12]\.saikomangaraw\.net\//)) {
              images.push(imageUrl);
            }
          }
        });

        const jsonResponse = {
          chap: chap,
          images: images
        };
        res.json(jsonResponse);



    } catch (error) {
      console.error('Error during data fetch or processing:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  };
