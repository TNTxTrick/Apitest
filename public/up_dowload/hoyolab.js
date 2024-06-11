const axios = require('axios');

exports.name = '/hoyolab';
exports.index = async (req, res, next) => {

const link = req.query.link;

        // Check if link is missing or invalid
        if (!link) {
          return res.status(400).send('Missing link parameter');
        }

        // Extract the ID from the link
        const idMatch = link.match(/article\/(\d+)/);
        const id = idMatch ? idMatch[1] : null;

        if (!id) {
          return res.status(400).send('Invalid link');
        }
  const url = `https://bbs-api-os.hoyolab.com/community/post/wapi/getPostFull?post_id=${id}&read=1&scene=1`;

  try {
    const response = await axios.get(url);
    const subject = response.data.data.post.post.subject;
    const uid = response.data.data.post.post.uid;
    const post_id = response.data.data.post.post.post_id;
    const view_num = response.data.data.post.stat.view_num;
    const reply_num = response.data.data.post.stat.reply_num;
    const like_num = response.data.data.post.stat.like_num;
    const bookmark_num = response.data.data.post.stat.bookmark_num;
    const share_num = response.data.data.post.stat.share_num;
    const contentString = response.data.data.post.post.content;
    const content = JSON.parse(contentString);
    const imageUrlList = content.imgs;
    const title = content.describe;
    res.json({ subject: subject , post_id: post_id , uid: uid , title: title , view_num: view_num , reply_num: reply_num , like_num: like_num , bookmark_num: bookmark_num , share_num: share_num , imageUrls: imageUrlList });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};
