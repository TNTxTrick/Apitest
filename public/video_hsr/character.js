exports.name = '/character/honkai3';
exports.index = async(req, res, next) => {
  const data = require('./data/data.json');
  var id = req.query.id;
  if(!id) return res.json({ error: 'thiếu "id" nhân vật  cần tìm' })
  var info = data.find(i => i.ID == id);
  if(info == undefined) return res.json({ error: 'không tìm thấy ID này!' });
  var ID = info.ID
  var name = info.name;
  var story = info.story;
  var skill = info.skill;
  var weapon = info.weapon;
  var ring = info.ring;
  var type = info.type;
  var type_dmg = info.type_dmg;
  var image = info.image;
  return res.json({
    ID,
    name,
    story,
    skill,
    weapon,
    ring,
    type,
    type_dmg,
    image
  })
} 
