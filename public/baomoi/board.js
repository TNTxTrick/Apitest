const axios = require("axios");

exports.name = '/baomoi/board';

exports.index = async (req, res, next) => {

  try {
    const response = await axios.get(`https://w-api.baomoi.com/api/v1/slave/widget/weather/get/board?ctime=1718355319&version=0.6.52&sig=374450c894ce221b784a93b8e9ab6a4a654cff62c745702ad60d96145c512f13&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`);

    const { boards } = response.data.data;

    res.json({ boards: boards });
  } catch (error) {
    console.error(error); // Log any errors

    if (error.response && error.response.status === 404) {
      res.status(404).send('Không tìm thấy dữ liệu'); // Resource not found
    } else {
      res.status(500).send('Lỗi khi lấy dữ liệu');
    }
  }
};
