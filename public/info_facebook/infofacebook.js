exports.name = '/infofacebook';
exports.index = async (req, res, next) => {
  const id = req.query.id;
  const axios = require("axios");
  axios.get(`https://graph.facebook.com/${id}?fields=id,is_verified,cover,updated_time,work,education,likes,created_time,work,posts,hometown,username,family,timezone,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=EAAD6V7os0gcBOzRoeV3AdapLZBwf7ZC2NVUgc2uD3EUlpZCWd1fDD0khfWiLrqvXQYQ6JZCcwz6adZBB5LkQv8ssjqw8ZAP5VUPD6A2aWNCwSSeKkQtXX653SOnFaEnvYC1y5AVHIr6ELZCUWZCG9ob2tCfwVeYVXLTAcj10OhhEwdrZBZBL51gngTbZBuvAAZDZD`)
    .then(resp => {
      const dj = {
        uid: resp.data.id,
        birthday: resp.data.birthday,
        gender: resp.data.gender,
        created_time: resp.data.created_time, 
        relationship_status: resp.data.relationship_status,
        quotes: resp.data.quotes,
        follower: resp.data.subscribers.summary.total_count,
        significant_other: resp.data.significant_other,
        cover: resp.data.cover,
        username: resp.data.username,
        link: resp.data.link,
        name: resp.data.name,
        tichxanh: resp.data.is_verified,
        work: resp.data.work,
        hometown: resp.data.hometown,
        locale: resp.data.locale,
        location: resp.data.location,
        avtlink: `https://graph.facebook.com/${resp.data.id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
      };
      res.send(dj);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send({
        error: 'error',
        message: "Đã có lỗi xảy ra"
      })
    });
};
