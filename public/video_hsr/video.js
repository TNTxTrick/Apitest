exports.name = '/video_hsr';
exports.index = async(req, res, next) => {
  const data = require('./data/data.json');
  var id = req.query.id;
  if(!id) return res.json({ error: 'thiếu "id" nhân vật  cần tìm' })
  var info = data.find(i => i.ID == id);
  if(info == undefined) return res.json({ error: 'không tìm thấy ID này!' });
  var ID = info.ID
  var name = info.name;
  var image = info.image;
  return res.json({
    ID,
    name,
    image
  })
} 
