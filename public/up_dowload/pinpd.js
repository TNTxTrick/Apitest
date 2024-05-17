const url = req.query.url;
  if (!url) {
    return res.status(400).send('Please provide a URL as a query parameter');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi/pinterest?url=${encodeURIComponent(url)}`);

    const $ = cheerio.load(data);
    let imgSrc = [];

    $('.col-md-12.col-lg-6 img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        imgSrc.push(src); // Add image URL to the array
      }
    });

    res.json({ imgSrc: imgSrc });
  } catch (error) {
    res.status(500).send('Error occurred while scraping');
  }
});
