const cheerio = require('cheerio');
const axios = require('axios');



  const id = req.params.id; 
  axios.get('https://ff.garena.com/vn/article/' + id)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const date = $('span.m-date').text();
      const title = $('div.banner-mode h1.title').text();
      const content = $('p span strong').map((_, elem) => $(elem).text().trim()).get();
      const img = $('span img').attr('src');
      const image =$('figure img').attr('src');

      console.log('Title:', title);

      const contentArray = content.map(line => line.trim());

      const images = [];
      if (img) images.push(img);
      if (image) images.push(image);

      const responseData = {
        date: date,
        title: title,
        content: contentArray,
        images: images
      };

      res.json(responseData);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Error fetching data');
    });
});


