const axios = require("axios");

exports.name = '/truyen/search';

exports.index = async (req, res, next) => {
  const keyword = req.query.keyword;

  try {
    const response = await axios.get(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${keyword}`);

    const params = response.data.data.params;
    const items = response.data.data.items.map(item => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      origin_name: item.origin_name,
      status: item.status,
      thumb_url: 'https://img.otruyenapi.com/uploads/comics/' + item.thumb_url,
      updatedAt: item.updatedAt,
      chaptersLatest: item.chaptersLatest,
    }));

    res.json({ items: items, params: params });
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).send('Lỗi khi lấy data');
  }
};

