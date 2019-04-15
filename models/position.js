var mongoose = require('../utils/database.js');

const Position = mongoose.model('position', {
	company: String,
	position: String,
	salary: String,
	address: String
});


module.exports = {
	addPosition(company, position, salary, address, cb) {
		var position = new Position({
			company: company,
			position: position,
			salary: salary,
			address: address   //es6中键和值相同可以省略
		});
		position.save(function(err){
			cb(err);
		})
	},
	getPosition: function(params, cb) {
		Position.find(params).then((result) => {
			cb(result);
		}).catch( () => {
			cb('error');
		} )
	},
	getPositionByPage: function(page, size, cb) {
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Position.find({}).limit(size).skip((page-1) * size).then((result) => {
			cb(result);
		}).catch( () => {
			cb('error');
		} )
	},
	removeItemById: function(id, cb) {
		Position.findByIdAndRemove(id, (err) => {
			cb(err);
		})
	},
	getPositionById: function(id, cb) {
		Position.findById(id).then((result) => {
			cb(result);
		}).catch((err) => {
			cb('error');
		})
	},
	updatePositionById: function(id, params, cb) {
		Position.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(( ) => {
			cb("error");
		})
	}
}
/**/