/**
 * Created by wuliang on 2017/4/20.
 * 单例模版
 */
var fs = require('fs');
var SQL = require('../panel/js/sql.js');

// var fs = require('fs');
// var SQL = require('./panel/js/sql.js');

var SqlUtil_instance = undefined;

var SqlUtil = {

	getInstance : function () {
		if(SqlUtil_instance === undefined){

			var target = {};
			target.name = "instance";
			target.db_name=Editor.url('packages://stateeditor/config/db_data.db', 'utf8');
			target.filebuffer = fs.readFileSync(target.db_name);
			target.db = new SQL.Database(target.filebuffer);

			target.testGetObj =function () {
				if(!target.db){
					target.log("正在初始化.....");
					return;
				}
				var obj={};
				var res = target.db.exec("SELECT * FROM 'maps' limit 1");
				 console.log(res);
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
				var sqlstr = "CREATE TABLE hello (a int, b char);";
				sqlstr += "INSERT INTO hello VALUES (0, 'hello');";
				sqlstr += "INSERT INTO hello VALUES (1, 'world');";
				target.db.run(sqlstr);
				target.log("保存配置成功!");
				target.save();
				// Run the query without returning anything




			}
			target.save = function () {
				var data = target.db.export();
				var buffer = new Buffer(data);
				fs.writeFile(target.db_name, buffer, function (error) {
					if (!error) {
						target.log("保存配置成功!");
					}
				});
			}
			target.log = function (msg) {
				Editor.info(msg);
			}

			SqlUtil_instance = target;

		}
		return SqlUtil_instance;
	}
}


module.exports = SqlUtil;

var util = SqlUtil.getInstance();

// console.log(util.testGetObj().key+"--------"+util.testGetObj().value);
// console.log(util.testCreat());