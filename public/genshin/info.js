exports.name = '/genshin/info';
exports.index = async(req, res, next) => {
  const data = require('./data/data.json');
  var id = req.query.id;
  if(!id) return res.json({ error: 'thiếu "id" nhân vật  cần tìm' })
  var info = data.find(i => i.ID == id);
  if(info == undefined) return res.json({ error: 'không tìm thấy ID này!' });
  var ID = info.ID
  var name = info.name;
  var va = info.va;
  var story = info.story;
  var element = info.element;
  var birthday = info.birthday;
  var countryside = info.countryside;
  var sex = info.sex;
  var belong = info.belong;
  var audio = info.audio;
  var image = info.image;
  return res.json({
    ID,
    name,
    va,
    story,
    element,
    birthday,
    countryside,
    sex,
    belong,
    audio,
    image
  })
} 
