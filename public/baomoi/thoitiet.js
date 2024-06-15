const axios = require("axios");

exports.name = '/thoitiet';

exports.index = async (req, res, next) => {

  try {
    const response = await axios.get(`https://w-api.baomoi.com/api/v1/slave/widget/weather/entry/get/list-by-date?boardId=ha-noi&daysAfter=7&ctime=1718360375&version=0.6.52&sig=34b07a220497090462292e72b1fe60fa48b1561586a878b5cac3c2e648fa3fd3&apiKey=kI44ARvPwaqL7v0KuDSM0rGORtdY1nnw`);

    const data = response.data.data;

    res.json(data);
  } catch (error) {
    console.error(error); // Log any errors

    if (error.response && error.response.status === 404) {
      res.status(404).send('Không tìm thấy dữ liệu'); // Resource not found
    } else {
      res.status(500).send('Lỗi khi lấy dữ liệu');
    }
  }
};
