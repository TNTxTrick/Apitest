
const url = 'https://honkai-star-rail.fandom.com/vi/wiki/Wiki_Honkai:_Star_Rail';

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Extract names from anchor tags within a specific section
      const names = [];
      $('span.card-text.card-font').each((i, element) => {
        names.push($(element).text());
      });

      res.json({
        names: names
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
});
