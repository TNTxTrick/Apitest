const url = req.query.url;
  if (!url) {
    return res.status(400).send('Please provide a URL as a query parameter');
  }

  try {
    const { data } = await axios.get(`https://dlpanda.com/vi/weibo?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(data);
    let imgSrc = [];

    // Scraping the image src URL from a specific class
    $('.col-md-12.col-lg-6 img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        imgSrc.push(src); // Thêm đường dẫn ảnh vào mảng
      }
    });

    res.json({ imgSrc: imgSrc });
  } catch (error) {
    res.status(500).send('Error occurred while scraping');
  }
});
