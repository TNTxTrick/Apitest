const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/truyen18/search';
exports.index = async (req, res, next) => {
const q = req.query.q;

      const link = `https://damconuong.net/tim-kiem?sort=-updated_at&filter%5Bname%5D=${q}&filter%5Bstatus%5D=2,1`;
      try {
          const { data } = await axios.get(link);
          const $ = cheerio.load(data);

          let results = [];
          let seen = new Set();

          $('div.w-full.relative').each((index, element) => {
              const titleArray = $('div.latest-chapter.truncate a').text().trim().split('\n').map(t => t.trim()).filter(Boolean);
              const chapterArray = $('div.p-2 a').map((i, el) => $(el).text().trim()).get();
              const updateArray = $('div.p-2 span').map((i, el) => $(el).text().trim()).get();
              const linkArray = $('div.w-full.relative div.relative a').map((i, el) => $(el).attr('href').trim()).get();

              for (let i = 0; i < titleArray.length; i++) {
                  const title = titleArray[i] || '';
                  const chapter = chapterArray[i] || '';
                  const update = updateArray[i] || '';
                  const link_chap = linkArray[i] || '';

                  const uniqueKey = `${title}-${chapter}-${update}-${link_chap}`;

                  if (!seen.has(uniqueKey)) {
                      seen.add(uniqueKey);
                      results.push({
                          title: title,
                          chapter: chapter,
                          update: update,
                          link_chap: 'https://damconuong.net' + link_chap
                      });
                  }
              }
          });

          res.json(results);
      } catch (error) {
          console.error('Error during data fetch or processing:', error);
          res.status(500).json({ error: 'Failed to fetch data' });
      }
  };
