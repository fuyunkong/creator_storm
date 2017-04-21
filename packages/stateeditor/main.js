'use strict';

var db_util= undefined;

module.exports = {

  load () {
    // execute when package loaded
	  db_util = require("./util/SqlUtil.js").getInstance();
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('stateeditor');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
     // Editor.Ipc.sendToPanel('stateeditor', 'stateeditor:hello');
    },
    'clicked' () {

    },
	  db_set:function (event,key,obj) {
		  Editor.log("db_set");

		   Editor.log(db_util.testGetObj());
		  // db_util.testCreat();

		  // var fs = require('fs');
		  // // var db_name="./config/db_data.db";
		  // var db_name=Editor.url('packages://stateeditor/config/db_data.db', 'utf8');
		  // // var SQL = require('./panel/js/sql.js');
		  // var SQL = require('./panel/js/sql.js');
		  //
		  // var filebuffer = fs.readFileSync(db_name);
		  // var db = new SQL.Database(filebuffer);
		  //
		  // Editor.log(db);
		  // Editor.log(JSON.stringify(db));
		  // // var sqlstr = "CREATE TABLE hello (a int, b char);";
		  // // sqlstr += "INSERT INTO hello VALUES (0, 'hello');";
		  // // sqlstr += "INSERT INTO hello VALUES (1, 'world');";
		  // // Editor.log(sqlstr);
		  // // db.run(sqlstr); // Run the query without returning anything
		  // // Editor.log("2222");
		  //
		  // // Run a query without reading the results
		  // db.run("CREATE TABLE test (col1, col2);");
		  // // Insert two rows: (1,111) and (2,222)
		  // db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);
		  //
		  // // Prepare a statement
		  // var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
		  // stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}
		  //
		  // // Bind new values
		  // stmt.bind({$start:1, $end:2});
		  // while(stmt.step()) { //
			//   var row = stmt.getAsObject();
			//   Editor.log(row);
			//   // [...] do something with the row of result
		  // }
		  //
		  // var data = db.export();
		  // var buffer = new Buffer(data);
		  // fs.writeFile(db_name, buffer, function (error) {
			//   if (!error) {
			// 	  console.log("保存配置成功!");
			//   }
		  // });
		  //
		  // var data = db.export();
		  // var buffer = new Buffer(data);
		  // fs.writeFileSync(db_name, buffer);




	  },
	  db_get:function (key,callback) {

		  Editor.log("db_get");
		  db_util.testCreat();
	  }
  },
};