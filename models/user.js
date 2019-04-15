var mongoose = require('../utils/database.js');

const User = mongoose.model('user', {
	username: String,
	password: String
});


module.exports = {
	register(username, password, cb) {
		var user = new User({
			username: username,
			password: password
		});
		user.save(function(err){
			cb(err);
		})
	},
	findUser(findPrams, cb){
		User.findOne(findPrams).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		});
	}
}
/**/