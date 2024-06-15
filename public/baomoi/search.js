const axios = require("axios");

exports.name = '/baomoi/search';

exports.index = async (req, res, next) => {
  const keyword = req.query.keyword;

  try {
    const response = await axios.get(`https://w-api.baomoi.com/api/v1/content/get/list-by-custom?listType=search&keyword=${keyword}&page=2&ctime=1718359846&version=0.6.52&sig=6a76cfc7e92855425393f369656b856100b0b9e0aff6cd5e6db6573af66859c2&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`);

    const data = response.data.data;

    res.json(data);
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).send('Lỗi khi lấy data');
  }
};
