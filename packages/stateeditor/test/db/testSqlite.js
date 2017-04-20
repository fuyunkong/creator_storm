/**
 * Created by wuliang on 2017/4/20.
 */


var Sequelize = require('sequelize');
var sequelize = new Sequelize('main', '', '', {
	host: 'localhost',
	dialect: 'sqlite',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},

	// SQLite only
	storage: '../../config/db_data.db'
});

var User = sequelize.define('user', {
	username: Sequelize.STRING,
	birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
	return User.create({
		username: 'janedoe',
		birthday: new Date(1980, 6, 20)
	});
}).then(function(jane) {
	console.log(jane.get({
		plain: true
	}));
});