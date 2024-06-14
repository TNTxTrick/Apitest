const axios = require("axios");

exports.name = '/baomoi/search';

exports.index = async (req, res, next) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).send('Keyword is required');
  }

  const link = `https://w-api.baomoi.com/api/v1/content/get/list-by-custom?listType=search&keyword=${keyword}&page=2&ctime=1718359846&version=0.6.52&sig=6a76cfc7e92855425393f369656b856100b0b9e0aff6cd5e6db6573af66859c2&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`;

  try {
    const response = await axios.get(link);
    const items = response.data?.data?.items;

    if (!items || items.length === 0) {
      return res.status(404).send('Không tìm thấy data');
    }

    res.json({ items });
  } catch (error) {
    console.error(error); // Log any errors

    if (error.response && error.response.status === 404) {
      res.status(404).send('Không tìm thấy data'); // Resource not found
    } else {
      res.status(500).send('Lỗi khi lấy dữ data');
    }
  }
};
