const axios = require("axios");

exports.name = '/tiki/item';

exports.index = async (req, res, next) => {
const link = req.query.link;

  if (link && link.startsWith('https://tiki.vn/')) {
    try {
      // Extract the id and spid from the link
      const url = new URL(link);
      const pathParts = url.pathname.split('-p');
      const id = pathParts[1].split('.')[0];
      const spid = url.searchParams.get('spid');

      if (id && spid) {
        const response = await axios.get(`https://tiki.vn/api/v2/products/${id}?platform=web&spid=${spid}&version=3`);
        res.json(response.data);
      } else {
        res.status(400).send('Invalid link format. Missing id or spid.');
      }
    } catch (error) {
      res.status(500).send('Error occurred while scraping the page');
    }
  } else {
    res.status(400).send('Hãy nhập đúng link');
  }
};
