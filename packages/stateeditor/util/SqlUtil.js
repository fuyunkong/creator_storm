/**
 * Created by wuliang on 2017/4/20.
 * 单例模版
 */
var fs = require('fs');
var SQL = require('../lib/sql.js');

// var fs = require('fs');
// var SQL = require('./panel/js/sql.js');

var SqlUtil_instance = undefined;

var SqlUtil = {

	getInstance : function () {
		if(SqlUtil_instance === undefined){

			var target = {};
			target.name = "maps";
			target.IsEditor = true;

			// target.db_name='../config/db_data.db'
			target.db_name=Editor.url('packages://stateeditor/config/db_data.db', 'utf8');
			target.filebuffer = fs.readFileSync(target.db_name);
			target.db = new SQL.Database(target.filebuffer);

			target.testGetObj =function () {
				if(!target.db){
					target.log("正在初始化.....");
					return;
				}
				var obj={};
				var res = target.db.exec("SELECT * FROM '" +
					target.name +
					"' limit 1");
				 // console.log(res);
				 if(res){
					 var result = res[0];
					 // console.log(result);
					 for(var i=0;i<result.columns.length;i++){
						 obj[result.columns[i]]=result.values[0][i];
					 }
				 }

				// console.log(obj);
				return obj;
			}
			target.testCreat=function() {
				if(!target.db){
					target.log("正在初始化.....");
					return;
				}
				console.log("test creator");
				// var sqlstr = "CREATE TABLE hello (a int, b char);";
				var sqlstr = "INSERT INTO hello VALUES (0, 'hello');";
				sqlstr += "INSERT INTO hello VALUES (1, 'world');";
				target.db.run(sqlstr);

				target.save();
				// Run the query without returning anything




			}
			target.save = function (msg,callback) {
				var data = target.db.export();
				var buffer = new Buffer(data);
				fs.writeFile(target.db_name, buffer, function (error) {
					var obj = {};
					if (!error) {
						obj.result=1;
						msg = msg +"成功!"
						target.log(msg);
					}else{
						obj.result=0;
						msg = msg +"失败!"
						target.error(msg);
					}

					if(callback){
						obj.msg= msg;
						callback(obj);
					}
				});
			}
			target.log = function (msg) {
				if(target.IsEditor){
					Editor.info(msg);
				}else{
					console.log(msg);
				}

			}
			target.error = function (msg) {

				if(target.IsEditor){
					Editor.error(msg);
				}else{
					console.log(msg);
				}
			}
			//插入一条数据
			target.add = function (key,value,callback) {

				var sqlstr = "insert into " +
					target.name +
					" (key, value) values ('" +
					key +
					"', '" +
					value +
					"');";
				target.db.run(sqlstr);
				target.save("添加",callback);
			};
			//移除key
			target.remove = function (key,callback) {
				var sqlstr ="delete from " +
					target.name +
					" where key='" +
					key +
					"';";
				target.db.run(sqlstr);
				target.save("删除",callback);
			}
			//获取key对应的value
			target.get = function (key,callback) {
				if(!target.db){
					target.log("初始化...");
					return;
				}
				var obj={};

				var res = target.db.exec("select * from " +
					target.name +
					" where key='" +
					key +
					"' limit 1;");
				// console.log(res);
				if(res[0]){
					var result = res[0];
					// console.log(result);
					for(var i=0;i<result.columns.length;i++){
						obj[result.columns[i]]=result.values[0][i];
					}
				}else{
					obj=undefined;
				}
				if(callback){
					callback(obj);
				}

				// console.log(obj);
				return obj;
			}
			//设置key
			target.set = function (key,value,callback) {
				function check(obj) {
					if(obj){

						target.update(key,value,callback);

					}else{
						target.add(key,value,callback);
					}
				}
				target.get(key,check);
			};
			//更新key
			target.update = function (key,value,callback) {
				var sqlstr ="UPDATE " +
					target.name +
					" set value='" +
					value +
					"' where key='" +
					key +
					"';";
				target.db.run(sqlstr);
				target.save("更新",callback);
			};

			SqlUtil_instance = target;

		}
		return SqlUtil_instance;
	}
}


module.exports = SqlUtil;

var util = SqlUtil.getInstance();

// console.log(util.testGetObj().key+"--------"+util.testGetObj().value);
// console.log(util.testCreat());

// util.add("tests","tests");
// util.remove("tests");

function print(obj) {
	console.log(obj);
}
// var obj = util.get("tests",print);

 // util.update("tests","dddddd",print);
// util.set("testws2","www222w",print);
util.get("testws2q",print);

