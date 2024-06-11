const axios = require('axios');

exports.name = '/infohoyolab';
exports.index = async (req, res, next) => {
const id = req.query.id;

        if (!id) {
          return res.status(400).send('Invalid link');
        }
  const url = `https://bbs-api-os.hoyolab.com/community/painter/wapi/user/full?scene=1&uid=${id}`;

  try {
    const response = await axios.get(url);
    const uid = response.data.data.user_info.uid;
    const nickname = response.data.data.user_info.nickname;
    const introduce = response.data.data.user_info.introduce;
    const achieve = response.data.data.user_info.achieve;
    const level_desc = response.data.data.user_info.level.level_desc;
    const avatar_url = response.data.data.user_info.avatar_url;
    res.json({ uid , nickname , introduce , achieve , level_desc , avatar_url });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};
