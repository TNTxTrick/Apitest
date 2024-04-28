exports.name = '/ff/list';
exports.index = async(req, res, next) => {
	const data = require('./data/data.json');

	const list = []
	for(let i of data) {
		var ID = i.ID
		var name = i.name
		list.push({
			ID,
			name
		})
	}
	return res.json(list)
}
