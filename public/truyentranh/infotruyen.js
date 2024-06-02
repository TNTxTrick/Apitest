const axios = require("axios");

exports.name = '/truyen/:keyword';

exports.index = async (req, res, next) => {
  const keyword = req.params.keyword; // Access route parameter using req.params

  try {
    const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${keyword}`);

    const { descriptionHead, seoSchema, item } = response.data.data;

    res.json({ descriptionHead, image: seoSchema.image, items: item });
  } catch (error) {
    console.error(error); // Log any errors

    if (error.response && error.response.status === 404) {
      res.status(404).send('Không tìm thấy truyện'); // Resource not found
    } else {
      res.status(500).send('Lỗi khi lấy dữ liệu');
    }
  }
};
