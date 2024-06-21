const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/tensor/postart';
exports.index = async (req, res, next) => {
const link = req.query.link;
  if (!link) {
    return res.status(400).send('Link is required');
  }

  const regex = /https:\/\/tensor\.art\/images\/(\d+)\?post_id=(\d+)/;
  const match = link.match(regex);
  if (!match) {
    return res.status(400).send('Invalid link format');
  }

  const id = match[1];
  const id2 = match[2];
  const url = `https://tensor.art/images/${id}?post_id=${id2}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const image = $('img').attr('src');
    const user_name = $('div.text-14.color-black.text-op-85.dark\\:color-white.dark\\:text-op-85').text();
    const link_creator = $('div.flex.flex-col.gap-24.p-24.pb-100.md\\:pb-24 a').attr('href');
    const tag_post = $('a.bg-fill-default.bg-op-4.c-text-secondary.rd-6.py-4.px-8.text-12')
    .map((i, el) => $(el).text())
    .get()
    .join(', ');
    const up_post = $('time').text();
    const likes = $('span.text-14.font-600').text();
    const comment = $('span.text-14.fw-600').text();
    const remix_time = $('div.vi-button__wrap').text();

    res.json({ user_name , link_creator: 'https://tensor.art' + link_creator , tag_post , up_post , likes , comment , remix_time , image });
  } catch (error) {
    console.error('Error fetching or parsing the page:', error);
    res.status(500).send('Error fetching or parsing the page');
  }
};
