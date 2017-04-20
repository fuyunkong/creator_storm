'use strict';


module.exports = {
  load () {
    // execute when package loaded
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
		  var db_util = require("./util/SqliteUtil");
    	


	  },
	  db_get:function (key,callback) {

	  }
  },
};