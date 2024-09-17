exports.name = '/infofacebook';
exports.index = async (req, res, next) => {
  const id = req.query.id;
  const axios = require("axios");
  axios.get(`https://graph.facebook.com/${id}?fields=id,is_verified,cover,updated_time,work,education,likes,created_time,work,posts,hometown,username,family,timezone,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=EAAD6V7os0gcBO4eWFqiFN1XuOtUW9oxsyq5ZANGfL7HA28ZAQaDxcNpPGrHeMb8NJ8FlLugVfoboZAvfnlApGT6d9v0Tcki9keS35L0J1RHqsBvuCLFokGwHiibDFO8ZC3hZBS65mSKw9v4DBpNfU8FtZBDrM7NtFTt4zXoBEBxZCkXEK0ctwDtaAonJgZDZD`)
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
