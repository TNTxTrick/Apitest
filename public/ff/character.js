exports.name = '/ff/info';
exports.index = async(req, res, next) => {
  const data = require('./data/data.json');
  var id = req.query.id;
  if(!id) return res.json({ error: 'thiếu "id" nhân vật  cần tìm' })
  var info = data.find(i => i.ID == id);
  if(info == undefined) return res.json({ error: 'không tìm thấy ID này!' });
  var ID = info.ID
  var name = info.name;
  var biographi = info.biographi;
  var birthday = info.birthday;
  var age = info.age;
  var gender = info.gender;
  var skill = info.skill;
  var awake = info.awake;
  var image = info.image;
  return res.json({
    ID,
    name,
    biographi,
    birthday,
    age,
    gender,
    skill,
    awake,
    image
  })
} 
