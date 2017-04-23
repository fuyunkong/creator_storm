'use strict';

var db_util= undefined;
require("./lib/jquery.min.js")

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
		  function callback(obj) {
			  if (event.reply) {
				  //if no error, the first argument should be null
				  event.reply(null, obj);
			  }
		  }
		  db_util.set(key,JSON.stringify(obj),callback);

	  },
	  db_get:function (event,key) {
		  Editor.log("db_get");
		  function callback(obj) {

		  	if(obj){
			    if (event.reply) {
				    //if no error, the first argument should be null
				    Editor.log(obj.value);
				    event.reply(null, JSON.parse(obj.value));
			    }
		    }else{
			    if (event.reply) {
				    //if no error, the first argument should be null
				    event.reply("获取失败", null);
			    }
		    }

		  }
		  db_util.get(key,callback);


	  }
  },
};