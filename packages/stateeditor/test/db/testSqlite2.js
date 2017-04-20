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

var keyString = sequelize.define('key-value', {
	key: Sequelize.STRING,
	value: Sequelize.STRING
});

function add(key,value,callback) {
	sequelize.sync().then(function() {
		return keyString.create({
			key: key,
			value: value
		});
	}).then(callback);
}

function set(key,value,callback) {

	function check(obj) {
		if(obj){

			obj.update({
				value: value
			}).then(callback);

		}else{
			add(key,value,callback);
		}
	}
	get(key,check);
}

function get(key,callback) {
	keyString.findOne({ where: {key: key} }).then(callback);
}

function remove(key,callback) {
	function select(obj) {
		if(obj){
			obj.destroy({ force: true }).then(callback);
		}
	}
	get(key,select);
}

function printObj(obj) {
	if(obj){
		console.log(obj.value);
	}

}
 // set("test1","test22www",printObj);
// get("test",printObj);

function dddd() {
	console.log("delete finished!!!")
}

// remove("test1",undefined)
remove("test1")

