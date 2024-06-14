const axios = require("axios");

exports.name = '/baomoi';

exports.index = async (req, res, next) => {

  try {
    const response = await axios.get(`https://w-api.baomoi.com/api/v1/content/get/list-by-custom?listType=region&imgSize=w100_r1x1&shortName=HO_CHI_MINH&ctime=1718355319&version=0.6.52&sig=852b1d4602951cb05a77a51f6c394db24453b0036b3baf41733acaa0715af717&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`);

    const { items } = response.data.data;

    res.json({ items: items });
  } catch (error) {
    console.error(error); // Log any errors

    if (error.response && error.response.status === 404) {
      res.status(404).send('Không tìm thấy dữ liệu'); // Resource not found
    } else {
      res.status(500).send('Lỗi khi lấy dữ liệu');
    }
  }
};
