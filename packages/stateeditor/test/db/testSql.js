/**
 * Created by wuliang on 2017/4/21.
 */



var fs = require('fs');
var SQL = require('../../panel/js/sql.js');
const db_name="../../config/db_data.db";
var filebuffer = fs.readFileSync(db_name);

// Load the db
var db = new SQL.Database(filebuffer);


// console.log(res.key);
// console.log(getobj());

function getobj() {
	var obj={};
	var res = db.exec("SELECT * FROM 'key-values' limit 1");
	console.log(res);
	var result = res[0];
	console.log(result);
	for(var i=0;i<result.columns.length;i++){
		obj[result.columns[i]]=result.values[0][i];
	}
	console.log(obj);
	return obj;

}

testCreat();
function testCreat() {
	console.log("test creator");
	var sqlstr = "CREATE TABLE hello (a int, b char);";
	sqlstr += "INSERT INTO hello VALUES (0, 'hello');"
	sqlstr += "INSERT INTO hello VALUES (1, 'world');"
	db.run(sqlstr); // Run the query without returning anything

	var data = db.export();
	var buffer = new Buffer(data);
	fs.writeFileSync(db_name, buffer);
}

