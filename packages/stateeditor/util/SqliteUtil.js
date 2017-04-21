/**
 * Created by wuliang on 2017/4/20.
 */


var Sequelize = require('sequelize');

var SqliteUtil_instance = undefined;

var SqliteUtil = {

	getInstance : function () {
		if(SqliteUtil_instance === undefined){

			var target = {};
			target.name = "SqliteUtil";
			target.sequelize= new Sequelize('main', '', '', {
				host: 'localhost',
				dialect: 'sqlite',
				pool: {
					max: 5,
					min: 0,
					idle: 10000
				},

				// SQLite only
				storage: '../config/db_data.db'
			});
			target.keyString= target.sequelize.define('key-value', {
				key: Sequelize.STRING,
				value: Sequelize.STRING
			});
			//插入一条数据
			target.add = function (key,value,callback) {
				target.sequelize.sync().then(function() {
					return target.keyString.create({
						key: key,
						value: value
					});
				}).then(callback);
			};
			//设置key
			target.set = function (key,value,callback) {
				function check(obj) {
					if(obj){

						obj.update({
							value: value
						}).then(callback);

					}else{
						target.add(key,value,callback);
					}
				}
				target.get(key,check);
			};
			//移除key
			target.remove = function (key,callback) {
				function select(obj) {
					if(obj){
						obj.destroy({ force: true }).then(callback);
					}
				}
				target.get(key,select);
			}
			//获取key对应的value
			target.get = function (key,callback) {
				target.keyString.findOne({ where: {key: key} }).then(callback);
			}



			SqliteUtil_instance = target;

		}
		return SqliteUtil_instance;
	}
}


module.exports = SqliteUtil;


// 测试功能
function printObj(obj) {
	if(obj){
		console.log(obj.value);
	}

}
console.log("-----------------");
// set("test1","test22rrr",printObj);

var util = SqliteUtil.getInstance();

util.set("test1","wewewewewew",printObj);
// util.get("test",printObj);
// util.remove("test");
function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

function testall(size) {
	for(var i=0;i<size;i++){

		util.add("test"+i,"test"+i,printObj);

	}
}
// testall(1000);
