const axios = require("axios");

exports.name = '/truyen-tranh/:keyword';

exports.index = async (req, res, next) => {
const keyword = req.params.keyword; // Access route parameter using req.params

  try {
    const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${keyword}`);

    const descriptionHead = response.data.data.seoOnPage.descriptionHead;
    const image = response.data.data.seoOnPage.seoSchema.image;    
    const items = response.data.data.item;

    res.json({ descriptionHead: descriptionHead, image: image, items: items});
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).send('Lỗi khi lấy data');
  }
});
